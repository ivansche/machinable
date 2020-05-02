import re
from typing import Dict, Union
import copy
import os
import inspect
from inspect import getattr_static
from typing import Optional, List
import datetime
from collections import OrderedDict

from ..store import Store
from ..store.record import Record
from ..store.log import Log
from ..config.mapping import ConfigMap, config_map
from ..config.parser import ModuleClass, parse_mixins
from ..utils.utils import apply_seed
from ..utils.dicts import update_dict
from ..utils.formatting import exception_to_str
from ..config.mapping import ConfigMethod
from machinable.utils.host import get_host_info
from .exceptions import ExecutionException


def set_alias(obj, alias, value):
    if isinstance(alias, str) and not hasattr(obj, alias):
        setattr(obj, alias, value)


def inject_components(component, components, on_create):
    signature = inspect.signature(on_create)

    if components is None:
        components = []

    # default: if there are no given parameters, create each component and assign suggested attribute_
    if len(signature.parameters) == 0:
        for index, c in enumerate(components):
            if not c._component_state.created:
                c.create()
            set_alias(component, c.attribute_, c)
            component.flags.COMPONENTS_ALIAS[c.attribute_] = index

        if component.node is not None:
            set_alias(component, component.node.attribute_, component.node)

        on_create()

        return True

    # user defined
    payload = OrderedDict()
    for index, (key, parameter) in enumerate(signature.parameters.items()):
        if parameter.kind is not parameter.POSITIONAL_OR_KEYWORD:
            # ignore *args and **kwargs
            raise TypeError(
                f"on_create only allows simple positional or keyword arguments"
            )

        if index == 0 and key != "node":
            raise TypeError(
                f"First argument of on_create has to be 'node', received '{key}' instead."
            )

        if key == "node":
            payload["node"] = component.node
        else:
            try:
                c = components[index - 1]
                alias = parameter.name
                if not parameter.name.startswith("_"):
                    c.create()
                    alias = parameter.name[1:]
                payload[parameter.name] = c
                component.flags.COMPONENTS_ALIAS[alias] = index - 1
            except IndexError:
                if parameter.default is parameter.empty:
                    raise TypeError(
                        f"Component {component.__class__.__name__}.on_create requires a components "
                        f"'{parameter.name}' but only {len(components)} were provided."
                    )

                payload[parameter.name] = parameter.default

    on_create(**payload)

    return True


def bind_config_methods(obj, config):
    if isinstance(config, list):
        return [bind_config_methods(obj, v) for v in config]

    if isinstance(config, tuple):
        return (bind_config_methods(obj, v) for v in config)

    if isinstance(config, dict):
        for k, v in config.items():
            if k == "_mixins_":
                continue
            config[k] = bind_config_methods(obj, v)
        return config

    if isinstance(config, str):
        # config method
        fn_match = re.match(r"(?P<method>\w+)\s?\((?P<args>.*)\)", config)
        if fn_match is not None:
            definition = config
            method = "config_" + fn_match.groupdict()["method"]
            args = fn_match.groupdict()["args"]
            if getattr(obj, method, False) is False:
                msg = "Config method %s specified but %s.%s() does not exist." % (
                    definition,
                    type(obj).__name__,
                    method,
                )
                raise AttributeError(msg)
            else:
                return ConfigMethod(obj, method, args, definition)

    return config


class ComponentState:
    def __init__(self):
        self.checkpoint_counter = 0
        self.created = False
        self.executed = False
        self.destroyed = False


class MixinInstance:
    def __init__(self, controller, mixin_class, attribute):
        self.config = {
            "controller": controller,
            "class": mixin_class,
            "attribute": attribute,
        }

    def __getattr__(self, item):
        # lazy-load class
        if isinstance(self.config["class"], ModuleClass):
            self.config["class"] = self.config["class"].load(instantiate=False)

        attribute = getattr(self.config["class"], item, None)

        if attribute is None:
            raise AttributeError(
                f"Mixin '{self.config['class'].__name__}' has no method '{item}'"
            )

        if isinstance(attribute, property):
            return attribute.fget(self.config["controller"])

        if not callable(attribute):
            return attribute

        if isinstance(getattr_static(self.config["class"], item), staticmethod):
            return attribute

        # if attribute is non-static method we decorate it to pass in the controller

        def bound_method(*args, **kwargs):
            # bind mixin instance to controller for mixin self reference
            self.config["controller"].__mixin__ = getattr(
                self.config["controller"], self.config["attribute"]
            )
            output = attribute(self.config["controller"], *args, **kwargs)

            return output

        return bound_method


class Mixin:
    """
    Mixin base class. All machinable mixins must inherit from this base class.
    """

    pass


class Component(Mixin):
    """
    Component base class. All machinable components must inherit from this class.

    ::: tip
    All components are Mixins by default. However, if you want to explicitly mark your components for Mixin-only use
    consider inheriting from the Mixin base class ``machinable.Mixin``.
    :::
    """

    attribute_ = None

    def __init__(self, config: dict = None, flags: dict = None, node=None):
        """Constructs the components instance.

        The initialisation and its events are side-effect free, meaning the application state is preserved
        as if no execution would have happened.
        """
        self.on_before_init(config, flags, node)

        self._node: Optional[Component] = node
        self._components: Optional[List[Component]] = None
        self._store: Optional[Store] = None
        self._actor_config = None
        self.__mixin__ = None
        self._component_state = ComponentState()

        if self.on_init(config, flags, node) is False:
            return

        if config is None:
            config = {}

        # we assign the raw config to allow config_methods to access it
        self._config: ConfigMap = config_map(config)

        # resolve config methods
        self._config: ConfigMap = bind_config_methods(self, config)
        self._config: ConfigMap = ConfigMap(
            self.config, _dynamic=False, _evaluate=self.config.get("_evaluate", True)
        )

        self._flags: ConfigMap = config_map(
            update_dict({"TUNING": False, "COMPONENTS_ALIAS": {}}, flags)
        )

        # bind mixins
        for mixin in parse_mixins(self.config.get("_mixins_"), valid_only=True):
            self.bind(mixin.get("origin", mixin["name"]), mixin["attribute"])

        self.on_after_init()

    def bind(self, mixin, attribute):
        """Binds a mixin to the components

        # Arguments
        mixin: Mixin module or class
        attribute: Attribute name, e.g. _my_mixin_
        """
        if isinstance(mixin, str):
            mixin = ModuleClass(mixin.replace("+.", "vendor."), baseclass=Mixin)
            setattr(self, attribute, MixinInstance(self, mixin, attribute))

    @property
    def config(self) -> ConfigMap:
        """Component configuration"""
        return self._config

    @property
    def flags(self) -> ConfigMap:
        """Component flags"""
        return self._flags

    @property
    def node(self) -> Optional["Component"]:
        """Node component or None"""
        return self._node

    @node.setter
    def node(self, value):
        self._node = value

    @property
    def components(self) -> Optional[List["Component"]]:
        """List of sub components or None"""
        return self._components

    @components.setter
    def components(self, value):
        self._components = value

    @property
    def store(self) -> Store:
        if self._store is None and isinstance(self.node, Component):
            # forward to node store if available
            return self.node.store
        return self._store

    @store.setter
    def store(self, value):
        self._store = value

    @property
    def record(self) -> Record:
        """Record writer instance"""
        return self.store.record

    @property
    def log(self) -> Log:
        """Log writer instance"""
        return self.store.log

    def __getattr__(self, name):
        # Mixins and dynamic attributes are set during construction; this helps suppressing IDE warnings
        raise AttributeError(
            f"{self.__class__.__name__} components has not attribute {name}"
        )

    def dispatch(
        self,
        components_config: List[Dict],
        storage_config: dict,
        actor_config=None,
        lifecycle=True,
    ):
        # Prepares and dispatches the components lifecycle and returns its result
        try:
            self._actor_config = actor_config

            if self.node is None and self.on_seeding() is not False:
                self.set_seed()

            if self.on_init_storage(storage_config) is not False:
                store = Store(config=storage_config)
                self.on_after_init_storage(store)
            else:
                store = None

            if self.on_init_components(components_config) is not False:
                components = []
                index = 0
                for component_config in components_config:
                    if self.on_init_components(component_config, index) is not False:
                        components.append(
                            component_config["class"](
                                config=copy.deepcopy(component_config["args"]),
                                flags=copy.deepcopy(component_config["flags"]),
                                node=self,
                            )
                        )
                        self.on_after_init_components(components[-1], index)
                        index += 1

                self.on_after_init_components(components)
            else:
                components = None

            if not lifecycle:
                return components, store

            self.create(components, store)
            status = self.execute()
            self.destroy()
        except (KeyboardInterrupt, SystemExit):
            status = ExecutionException(
                reason="user_interrupt",
                message="The components execution has been interrupted by the user or system.",
            )
        except BaseException as ex:
            status = ExecutionException(
                reason="exception",
                message=f"The following exception occurred: {ex}\n{exception_to_str(ex)}",
            )

        return status

    def create(self, components=None, store=None):
        """Creates the components

        ::: tip
        This method is triggered automatically. However, child components creation can be suppressed in the on_create
        event of the node components. See [on_create](#on_create) for details.
        :::

        Triggers create events of the lifecycle and restores the components from provided checkpoint if any

        # Arguments
        components: Optional list of child components instances that are used by the components
        store: Optional store instance to be used by the components
        """
        self.on_before_create()

        if store is not None:
            self.store = store

        if components is not None:
            self.components = components

        # prepare child components and invoke on_create event
        inject_components(self, self.components, self.on_create)

        checkpoint = self.flags.get("CHECKPOINT", False)
        if checkpoint:
            self.restore_checkpoint(checkpoint)

        self.on_after_create()

        self._component_state.created = True

    def execute(self):
        """Executes the components

        Triggers execution events and writes execution meta-data

        ::: tip
        Execution is triggered automatically for node components only.
        :::
        """
        self.on_before_execute()

        if self.store:
            self.store.statistics["on_execute_start"] = datetime.datetime.now()
            self.store.write("host.json", get_host_info(), _meta=True)
            self.store.write("component.json", self.serialize(), _meta=True)
            self.store.write(
                "components.json",
                [component.serialize() for component in self.components]
                if self.components
                else [],
                _meta=True,
            )

        try:
            status = self.on_execute()
        except (KeyboardInterrupt, StopIteration) as e:
            status = e

        # if on_iterate is not overwritten ...
        if hasattr(self.on_execute_iteration, "_deactivated") or self.flags.get(
            "TUNING", False
        ):
            # on_execute becomes execute event
            pass
        else:
            # otherwise, we enable the iteration paradigm
            iteration = -1
            while True:
                iteration += 1
                self.flags.ITERATION = iteration
                self.on_before_execute_iteration(iteration)

                try:
                    callback = self.on_execute_iteration(iteration)
                    if self.on_after_execute_iteration(iteration) is not False:
                        # trigger records.save() automatically
                        if (
                            self.store
                            and self.store.has_records()
                            and not self.store.record.empty()
                        ):
                            self.store.record["_iteration"] = iteration
                            self.store.record.save()
                except (KeyboardInterrupt, StopIteration):
                    callback = StopIteration

                if callback is StopIteration:
                    break

        self.on_after_execute()

        self._component_state.executed = True

        return status

    def destroy(self):
        """Destroys the components

        Triggers destroy events

        ::: tip
        This method is triggered automatically.
        :::
        """
        self.on_before_destroy()

        if self.components and len(self.components) > 0:
            for child in self.components:
                if (
                    child._component_state.created
                    and not child._component_state.destroyed
                ):
                    child.destroy()

        self.on_destroy()

        if self.store:
            self.store.destroy()

        self.on_after_destroy()

        self._component_state.destroyed = True

    def set_seed(self, seed=None) -> bool:
        """Applies a global random seed

        # Arguments
        seed: Integer, random seed. If None, self.flags.SEED will be used

        To prevent the automatic seeding, you can overwrite
        the on_seeding event and return False
        """
        if seed is None:
            seed = self.flags.get("SEED")

        return apply_seed(seed)

    def save_checkpoint(self, path: str = None, timestep=None) -> Union[bool, str]:
        """Saves components to a checkpoint

        # Arguments
        path: Path where checkpoints should be saved
        timestep: Optional timestep of checkpoint. If None, timestep will count up automatically

        # Returns
        Filepath of the saved checkpoint or False if checkpoint has not been saved
        """
        if timestep is None:
            timestep: int = self._component_state.checkpoint_counter

        if path is None:
            if not self.node.store:
                raise ValueError("You need to specify a checkpoint path")

            fs_prefix, basepath = self.node.store.config["url"].split("://")
            if fs_prefix != "osfs":
                # todo: support non-local filesystems via automatic sync
                raise NotImplementedError(
                    "Checkpointing to non-os file systems is currently not supported."
                )
            checkpoint_path = self.node.store.get_path("checkpoints", create=True)
            path = os.path.join(os.path.expanduser(basepath), checkpoint_path)

        checkpoint = self.on_save(path, timestep)

        if checkpoint is not False:
            self._component_state.checkpoint_counter += 1

        return checkpoint

    def restore_checkpoint(self, filepath=None):
        """Restores a checkpoint

        # Arguments
        filepath: Checkpoint filepath
        """
        if self.store is not None:
            self.store.log.info(f"Restoring checkpoint {filepath}")
        return self.on_restore(filepath)

    def serialize(self):
        return {
            "config": self.config.toDict(evaluate=True, with_hidden=False),
            "flags": self.flags.toDict(evaluate=True),
        }

    # life cycle

    def on_seeding(self):
        """Lifecycle event to implement custom seeding

        Return False to prevent the default seeding procedure
        """
        pass

    def on_before_init(self, config=None, flags=None, node=None):
        """Lifecycle event triggered before components initialisation"""
        pass

    def on_init(self, config=None, flags=None, node=None):
        """Lifecycle event triggered during components initialisation

        Return False to prevent the default configuration and flag instantiation
        """
        pass

    def on_after_init(self):
        """Lifecycle event triggered after components initialisation"""
        pass

    def on_before_create(self):
        """Lifecycle event triggered before components creation"""
        pass

    def on_create(self):
        """Lifecycle event triggered during components creation

        The method can declare arguments to handle components explicitly. For example, the signature
        ``on_create(self, node, alias_of_child_1, alias_of_child_2=None)`` declares that components
        accepts two sub components with alias ``alias_of_child_1`` and ``alias_of_child_2`` where
        the latter is declared optional. If the alias starts with an underscore ``_`` the components lifecycle
        will not be triggered automatically.

        The function signature may also be used to annotate expected types, for example:

        ```python
        on_create(self, node: DistributedExperiment, model: DistributedModel = None):
            self.experiment = node
            self.model = model
        ```
        Note, however, that the type annotation will not be enforced.
        """
        pass

    def on_save(self, checkpoint_path: str, timestep: int) -> Union[bool, str]:
        """Implements the checkpoint functionality of the components

        # Arguments
        checkpoint_path: String, target directory
        timestep: Integer, counting number of checkpoint

        # Returns
        Returns the name of the checkpoint file or path. Return False to indicate that checkpoint has not been saved.
        """
        pass

    def on_restore(self, checkpoint_file: str):
        """Implements the restore checkpoint functionality of the components

        # Arguments
        checkpoint_path: String, source directory
        timestep: Integer, counting number of checkpoint

        # Returns
        Return False to indicate that checkpoint has not been restored.
        """
        pass

    def on_init_components(self, components_config, index: Optional[int] = None):
        """Lifecycle event triggered during components initialisation

        Return False to prevent the components instantiation"""
        pass

    def on_after_init_components(self, components, index: Optional[int] = None):
        """Lifecycle event triggered after components initialisation"""
        pass

    def on_init_storage(self, storage_config: Dict):
        """Lifecycle event triggered at write initialisation

        Return False to prevent the default write instantiation
        """
        pass

    def on_after_init_storage(self, storage: Store):
        """Lifecycle event triggered after store initialisation"""
        pass

    def on_after_create(self):
        """Lifecycle event triggered after components creation"""
        pass

    def on_before_execute(self):
        """Lifecycle event triggered before components execution"""
        pass

    def on_execute(self):
        """Lifecycle event triggered at components execution

        ::: tip
        This event and all other execution events are triggered in node components only
        :::
        """
        pass

    def on_before_execute_iteration(self, iteration: int):
        """Lifecycle event triggered before an execution iteration
        """
        pass

    def on_execute_iteration(self, iteration: int):
        """Lifecycle event triggered at execution iteration

        Allows to implement repeating iterations

        The method is repeatedly called until StopIteration is returned or raised; iteration is increased on each call
        The iteration number is also available class-wide under self.flags.ITERATION

        # Arguments
        iteration: Integer, iteration number that automatically increases in every iteration starting from 0
        """
        pass

    # disable unless overridden
    on_execute_iteration._deactivated = True

    def on_after_execute_iteration(self, iteration: int):
        """Lifecycle event triggered after execution iteration"""
        pass

    def on_after_execute(self):
        """Lifecycle event triggered after execution"""
        pass

    def on_before_destroy(self):
        """Lifecycle event triggered before components destruction"""
        pass

    def on_destroy(self):
        """Lifecycle event triggered at components destruction"""
        pass

    def on_after_destroy(self):
        """Lifecycle event triggered after components destruction"""
        pass


class FunctionalComponent:
    def __init__(self, function, node_config=None, node_flags=None):
        self.function = function
        self.node = {"config": None, "flags": None}
        self.set_config(node_config, node_flags)
        self._argument_structure = OrderedDict()

    def __call__(self, config=None, flags=None):
        # virtual constructor
        self.set_config(config, flags)
        return self

    def set_config(self, config, flags):
        if config is None:
            config = {}
        if flags is None:
            flags = {}
        self.node["config"] = copy.deepcopy(config)
        self.node["flags"] = copy.deepcopy(flags)

    def dispatch(self, components_config, storage_config, actor_config=None):
        apply_seed(self.node["flags"].get("SEED"))
        self.node["flags"]["ACTOR"] = actor_config
        components = [
            {"config": copy.deepcopy(c["args"]), "flags": copy.deepcopy(c["flags"]),}
            for c in components_config
        ]

        # analyse argument structure
        signature = inspect.signature(self.function)
        payload = OrderedDict()

        for index, (key, parameter) in enumerate(signature.parameters.items()):
            if parameter.kind is not parameter.POSITIONAL_OR_KEYWORD:
                # disallow *args and **kwargs
                raise TypeError(
                    f"Component only allows simple positional or keyword arguments,"
                    f"for example my_component(node, components, store)"
                )

            if key == "node":
                payload["node"] = config_map(self.node)
            elif key == "components":
                payload["components"] = [
                    config_map(component) for component in components
                ]
            elif key == "store" or key == "_store":
                if key == "_store":
                    payload["store"] = storage_config
                else:
                    store = Store(storage_config)
                    store.statistics["on_execute_start"] = datetime.datetime.now()
                    store.write("host.json", get_host_info(), _meta=True)
                    store.write(
                        "component",
                        {"config": self.node["config"], "flags": self.node["flags"]},
                        _meta=True,
                    )
                    store.write(
                        "components",
                        [
                            {"config": c["config"], "flags": c["flags"]}
                            for c in components
                        ],
                        _meta=True,
                    )
                    payload["store"] = store
            else:
                raise ValueError(
                    f"Unrecognized argument: '{key}'. "
                    f"Components take the following arguments: "
                    f"'node', 'components' and 'store'"
                )

        try:
            return self.function(**payload)
        except (KeyboardInterrupt, SystemExit):
            status = ExecutionException(
                reason="user_interrupt",
                message="The components execution has been interrupted by the user or system.",
            )
        except BaseException as ex:
            status = ExecutionException(
                reason="exception",
                message=f"The following exception occurred: {ex}\n{exception_to_str(ex)}",
            )

        return status