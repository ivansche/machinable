import os
import copy

import ray
from ray.exceptions import RayActorError

from .engine import Engine
from ..utils.dicts import update_dict
from ..utils.formatting import exception_to_str
from ..core.exceptions import ExecutionException
from ..core.component import FunctionalComponent


class RayEngine(Engine):
    def serialize(self):
        return {"type": "ray"}

    async def submit(self, execution):
        if not ray.is_initialized():
            ray.init()

        for arguments in execution.schedule.iterate(execution.storage):
            try:
                result = self.process(*arguments)
                if isinstance(result, ray.ObjectID):
                    result = ray.get(result)
                execution.set_result(result)
            except RayActorError as ex:
                result = ExecutionException(
                    reason="exception",
                    message=f"The following exception occurred: {ex}\n{exception_to_str(ex)}",
                )
                execution.set_result(result)

        return execution

    def execute(
        self,
        component,
        components=None,
        storage=None,
        resources=None,
        args=None,
        kwargs=None,
    ):
        if isinstance(component["class"], FunctionalComponent):
            nd = ray.remote(resources=resources)(FunctionalComponent).remote(
                component["class"].function, component["args"], component["flags"],
            )
        else:
            nd = ray.remote(resources=resources)(component["class"]).remote(
                component["args"], component["flags"]
            )

        # destroy events class as independent instances will be recreated in the local workers
        storage["events"] = None

        return nd.dispatch.remote(components, storage, nd)

    def tune(
        self,
        component,
        components=None,
        store=None,
        resources=None,
        args=None,
        kwargs=None,
    ):
        # local import to enable Ray driver use without ray[tune] dependencies
        import ray.tune
        from ray.tune.trainable import Trainable
        from ray.tune.result import DONE

        if args is None:
            args = []
        if kwargs is None:
            kwargs = {}

        if "events" in store:
            del store["events"]

        class MachinableTuningComponent(Trainable):
            def _setup(self, config):
                # apply config updates
                components_update = [{} for _ in range(len(components))]
                if "node" in config:
                    node_update = config["node"]
                    if "components" in config:
                        components_update = config["children_patch"]
                else:
                    node_update = config

                node_args = copy.deepcopy(component["args"])
                node_args = update_dict(node_args, node_update)
                node_flags = copy.deepcopy(component["flags"])
                node_flags["TUNING"] = True

                components_config = copy.deepcopy(components)
                for i in range(len(components)):
                    components_config[i]["args"] = update_dict(
                        components[i]["args"], components_update[i]
                    )

                observer_config = copy.deepcopy(store)
                observer_config["url"] = "../../../"
                observer_config["allow_overwrites"] = True

                self.node = component["class"](node_args, node_flags)
                self.children, self.observer = self.node.dispatch(
                    components_config, observer_config, self, lifecycle=False
                )
                self.node.create(self.children, self.observer)
                self.node.execute()
                self._node_execution_iterations = -1

            def _train(self):
                if hasattr(self.node.on_execute_iteration, "_deactivated"):
                    raise NotImplementedError(
                        "on_execute_iteration has to be implemented to allow for step-wise tuning"
                    )

                self._node_execution_iterations += 1
                self.node.flags.ITERATION = self._node_execution_iterations
                self.node.on_before_execute_iteration(self._node_execution_iterations)
                try:
                    callback = self.node.on_execute_iteration(
                        self._node_execution_iterations
                    )
                    if (
                        self.node.on_after_execute_iteration(
                            self._node_execution_iterations
                        )
                        is not False
                    ):
                        # trigger records.save() automatically
                        if (
                            self.node.store.has_records()
                            and not self.node.store.record.empty()
                        ):
                            self.observer.record[
                                "_iteration"
                            ] = self._node_execution_iterations
                            self.observer.record.save()
                except (KeyboardInterrupt, StopIteration):
                    callback = StopIteration

                if len(self.node.record.history) > self._node_execution_iterations:
                    data = self.node.record.history[-1].copy()
                else:
                    data = {}

                data[DONE] = callback is StopIteration

                return data

            def _save(self, tmp_checkpoint_dir):
                return self.node.save_checkpoint(tmp_checkpoint_dir)

            def _restore(self, checkpoint):
                self.node.restore_checkpoint(checkpoint)

            def _stop(self):
                self.node.destroy()

        if "url" not in store:
            store["url"] = "~/ray_results"

        if store["url"].find("://") != -1:
            fs_prefix, local_dir = store["url"].split("://")
            if fs_prefix != "osfs":
                raise ValueError(
                    "Store has to be local; use upload_dir or sync options of Ray tune to copy to remote."
                )
        else:
            local_dir = store["url"]

        kwargs["name"] = os.path.join(store["group"], store["uid"])
        kwargs["resources_per_trial"] = resources
        kwargs["local_dir"] = local_dir

        output = ray.tune.run(MachinableTuningComponent, *args, **kwargs)

        return output