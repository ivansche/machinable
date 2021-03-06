import ast
import copy
import importlib
import os
from typing import Union

from ..filesystem import open_fs
from ..submission.collections import SubmissionCollection
from ..submission.submission import Submission
from ..utils.dicts import update_dict
from ..utils.formatting import exception_to_str
from ..utils.identifiers import decode_submission_id
from ..utils.importing import resolve_instance
from ..utils.traits import Jsonable

_register = {
    "native": "machinable.index.native_index",
    "sql": "machinable.index.sql_index",
}

_latest = [None]


class Index(Jsonable):
    def __new__(cls, *args, **kwargs):
        # Index is an abstract class for which instantiation is meaningless.
        # Instead, we return an appropriate default subclass
        if cls is Index:
            try:
                from .sql_index import SqlIndex as Instance
            except ImportError:
                from .native_index import NativeIndex as Instance

            return super().__new__(Instance)

        return super().__new__(cls)

    @classmethod
    def latest(cls):
        return _latest[0]

    @classmethod
    def set_latest(cls, latest):
        _latest[0] = latest

    @staticmethod
    def register(index, name=None):
        if name is None:
            name = index.__name__
        _register[name] = index

    @classmethod
    def get(cls, args):
        if isinstance(args, Index):
            return args

        resolved = resolve_instance(args, Index, "_machinable.indexes")
        if resolved is not None:
            return resolved

        if isinstance(args, dict):
            args = copy.deepcopy(args)

        if isinstance(args, str):
            args = {"type": args}

        if args is None:
            args = {}

        if "type" not in args:
            args["type"] = "native"

        index = args.pop("type")

        arg = []
        if index.find(":") != -1:
            index, version = index.split(":", maxsplit=1)
            try:
                options = ast.literal_eval(version)
            except ValueError:
                options = version
            if isinstance(options, dict):
                args = update_dict(args, options)
            elif isinstance(options, (list, tuple)):
                arg.extend(options)
            else:
                arg.append(options)

        try:
            if isinstance(_register[index], str):
                engine_module = importlib.import_module(_register[index])
                class_name_snake = _register[index].split(".")[-1]
                class_name = "".join(
                    p.capitalize() for p in class_name_snake.split("_")
                )
                _register[index] = getattr(engine_module, class_name)
        except KeyError:
            raise ValueError(f"Unknown index: {index}.")
        except ImportError as ex:
            raise ValueError(f"Index import failed: {exception_to_str(ex)}")
        except AttributeError:
            raise ValueError(f"Index could not be found.")

        return _register[index](*arg, **args)

    @classmethod
    def unserialize(cls, serialized):
        return cls.get(serialized)

    def add(self, submission):
        """Adds a submission to the index

        # Arguments
        submission: String|Submission, filesystem URL or submission
        """
        submission = Submission.create(submission)

        self._add(submission)

        return self

    def find(self, submission_id: str):
        """Finds an experiment

        # Arguments
        submission_id: String, submission ID. If None, all available index will be returned.

        # Returns
        Instance or collection of machinable.storage.Submission
        """
        decode_submission_id(submission_id, or_fail=True)
        return self._find(submission_id)

    def find_all(self):
        return SubmissionCollection(self._find_all())

    def find_latest(self, limit=10, since=None):
        return SubmissionCollection(self._find_latest(limit=limit, since=since))

    def add_from_storage(self, url):
        with open_fs(url) as filesystem:
            for path, info in filesystem.walk.info():
                if not info.is_dir:
                    continue
                directory, name = os.path.split(path)
                if not decode_submission_id(name, or_fail=False):
                    continue
                self.add(filesystem.get_url(path))

        return self

    def __str__(self):
        return self.__repr__()

    # Methods to overwrite

    def serialize(self):
        # return {"type": "module_name", ...}
        raise NotImplementedError

    def _add(self, experiment):
        raise NotImplementedError

    def _find(self, submission_id: str) -> Union[Submission, None]:
        raise NotImplementedError

    def _find_all(self) -> SubmissionCollection:
        raise NotImplementedError

    def _find_latest(self, limit=10, since=None) -> SubmissionCollection:
        raise NotImplementedError

    def __repr__(self):
        raise NotImplementedError
