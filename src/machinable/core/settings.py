import os

import yaml

from machinable.utils.dicts import update_dict

_settings = None


def get_settings(reload=False, file="~/.machinable/settings.yaml"):
    global _settings
    if _settings is None or reload:
        try:
            with open(os.path.expanduser(file), "r") as f:
                _settings = yaml.load(f, Loader=yaml.SafeLoader)
        except FileNotFoundError:
            _settings = {}
        except yaml.parser.ParserError as e:
            _settings = {"_errors": f"Invalid configuration file: {e}"}

        # defaults
        _settings = update_dict(
            {
                "cache": {"imports": False},
                "imports": {},
                "database": {
                    "default": "sqlite",
                    "sqlite": {"driver": "sqlite", "database": ":memory:"},
                },
                "tmp_directory": "userdata://machinable:machinable/tmp",
                "default_storage": "mem://",
                "default_engine": None,
                "engines": {"native": {"processes": 1}},
            },
            _settings,
        )

    return _settings
