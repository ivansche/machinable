(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{394:function(t,e,s){"use strict";s.r(e);var a=s(42),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"experiment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#experiment"}},[t._v("#")]),t._v(" Experiment")]),t._v(" "),s("h2",{attrs:{id:"experiment-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#experiment-2"}},[t._v("#")]),t._v(" Experiment")]),t._v(" "),s("p",[s("code",[t._v("machinable.Experiment()")])]),t._v(" "),s("p",[t._v("Defines an execution schedule for available components. The experiment interface is fluent,\nmethods can be chained in arbitrary order.")]),t._v(" "),s("h4",{attrs:{id:"arguments"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("components")]),t._v(": Optional "),s("code",[t._v("String")]),t._v(" or "),s("code",[t._v("tuple")]),t._v(" components definition to add to the experiment")])]),t._v(" "),s("h4",{attrs:{id:"example"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[t._v("#")]),t._v(" Example")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" machinable "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" ml\nlinear_regression "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ml"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Experiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mnist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("repeat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#### or using the shorthand where components arguments are passed into the constructor")]),t._v("\nlinear_regression "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ml"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Experiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mnist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("repeat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"component"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#component"}},[t._v("#")]),t._v(" component")]),t._v(" "),s("p",[s("code",[t._v("component(self, name, version=None, checkpoint=None, flags=None, resources=None)")])]),t._v(" "),s("p",[t._v("Adds a component to the experiment")]),t._v(" "),s("h4",{attrs:{id:"arguments-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments-2"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("name")]),t._v(": "),s("code",[t._v("String")]),t._v(", the name of the components as defined in the machinable.yaml")]),t._v(" "),s("li",[s("strong",[t._v("version")]),t._v(": dict|"),s("code",[t._v("String")]),t._v(", a configuration update to override its default config")]),t._v(" "),s("li",[s("strong",[t._v("checkpoint")]),t._v(": "),s("code",[t._v("String")]),t._v(", optional URL to a checkpoint file from which the components will be restored")]),t._v(" "),s("li",[s("strong",[t._v("flags")]),t._v(": dict, optional flags to be passed to the component")]),t._v(" "),s("li",[s("strong",[t._v("resources")]),t._v(": dict, specifies the resources that are available to the component.\nThis can be computed by passing in a callable (see below)")])]),t._v(" "),s("h4",{attrs:{id:"examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" machinable "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" ml\nexperiment "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ml"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Experiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("component"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'models.linear_regression'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" version"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'alpha'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h4",{attrs:{id:"dynamic-resource-computation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dynamic-resource-computation"}},[t._v("#")]),t._v(" Dynamic resource computation")]),t._v(" "),s("p",[t._v("You can condition the resource specification on the configuration, for example:")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[t._v("resources "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("lambda")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("engine"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" component"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gpu'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" component"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("num_gpus "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("The arguments of the callable are:\nengine - The engine instance\ncomponent - The full component specification (config, flags, module)\ncomponents - List of sub-component specifications")]),t._v(" "),s("h3",{attrs:{id:"components"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#components"}},[t._v("#")]),t._v(" components")]),t._v(" "),s("p",[s("code",[t._v("components(self, node, components=None, resources=None)")])]),t._v(" "),s("p",[t._v("Adds a component with sub-components to the experiment")]),t._v(" "),s("h4",{attrs:{id:"arguments-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments-3"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("node")]),t._v(": machinable.ExperimentComponent specifying the node components")]),t._v(" "),s("li",[s("strong",[t._v("components")]),t._v(": optional list of machinable.Component, supplementary components for this node")]),t._v(" "),s("li",[s("strong",[t._v("resources")]),t._v(": dict, specifies the resources that are available to the component")])]),t._v(" "),s("h4",{attrs:{id:"examples-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples-2"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" machinable "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" ml\nexperiment "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ml"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Experiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    node"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mnist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" version"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'~shuffled'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("                "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#### main component")]),t._v("\n    components"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'resnet'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'resnext'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'lr'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3e")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#### sub-components")]),t._v("\n    resources"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'num_gpus'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"copy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#copy"}},[t._v("#")]),t._v(" copy")]),t._v(" "),s("p",[s("code",[t._v("copy(self)")])]),t._v(" "),s("p",[t._v("Returns a copy of the current experiment object")]),t._v(" "),s("h3",{attrs:{id:"name"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#name"}},[t._v("#")]),t._v(" name")]),t._v(" "),s("p",[s("code",[t._v("name(self, name:str)")])]),t._v(" "),s("p",[t._v("Sets an experiment name")]),t._v(" "),s("h4",{attrs:{id:"arguments-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments-4"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("name")]),t._v(": "),s("code",[t._v("String")]),t._v(", experiment name.\nMust be a valid Python variable name or path e.g. "),s("code",[t._v("my_name")]),t._v(" or "),s("code",[t._v("example.name")]),t._v(" etc.")])]),t._v(" "),s("h3",{attrs:{id:"repeat"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#repeat"}},[t._v("#")]),t._v(" repeat")]),t._v(" "),s("p",[s("code",[t._v("repeat(self, k, name='REPEAT', mode='independent')")])]),t._v(" "),s("p",[t._v("Repeats the experiment k times")]),t._v(" "),s("p",[t._v("Schedules the current experiment multiple times and injects the flags REPEAT_NUMBER and REPEAT_SEED to the\nnode instances.")]),t._v(" "),s("h4",{attrs:{id:"arguments-5"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments-5"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("k")]),t._v(": "),s("code",[t._v("Integer")]),t._v(", the number of repetitions")]),t._v(" "),s("li",[s("strong",[t._v("name")]),t._v(": "),s("code",[t._v("String")]),t._v(", flag prefix, e.g. '{name}_SEED' etc. Defaults to REPEAT")])]),t._v(" "),s("h4",{attrs:{id:"examples-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples-3"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" machinable "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" ml\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#### five independent runs of the same node")]),t._v("\nml"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Experiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'regression'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("repeat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"split"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#split"}},[t._v("#")]),t._v(" split")]),t._v(" "),s("p",[s("code",[t._v("split(self, k, name='SPLIT', mode='independent')")])]),t._v(" "),s("p",[t._v("Splits the experiment k times")]),t._v(" "),s("p",[t._v("Schedules the current experiment k times and injects appropriate flags SPLIT_NUMBER and SPLIT_SEED to the\nnode instances. Note that machinable does not split the nodes automatically. The user\nhas to implement the algorithmic splitting based on the flag information. For example, to implement\na cross-validation algorithm the node should split the data using the split seed in the flag\nSPLIT_SEED and use the split that is specified in the flag SPLIT_NUMBER.")]),t._v(" "),s("h4",{attrs:{id:"arguments-6"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments-6"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("k")]),t._v(": "),s("code",[t._v("Integer")]),t._v(", the number of splits")]),t._v(" "),s("li",[s("strong",[t._v("name")]),t._v(": "),s("code",[t._v("String")]),t._v(", flag prefix, e.g. '{name}_SEED' etc. Defaults to SPLIT")])]),t._v(" "),s("h4",{attrs:{id:"examples-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples-4"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" machinable "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" ml\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#### five independent runs of the same node")]),t._v("\nml"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Experiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'regression'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("repeat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"tune"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tune"}},[t._v("#")]),t._v(" tune")]),t._v(" "),s("p",[s("code",[t._v("tune(self, *args, **kwargs)")])]),t._v(" "),s("p",[t._v("Schedules for hyperparameter tuning")]),t._v(" "),s("p",[t._v("Components need to implement on_execute_iteration event that becomes tune training step. The record writer\ncan be used as usual. In particular, record fields may be used in stop conditions.")]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("Tuning integration is experimental. Please report any issues that you encounter.")])]),t._v(" "),s("h4",{attrs:{id:"arguments-7"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments-7"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("p",[t._v("The arguments differ based on the used engine.")]),t._v(" "),s("ul",[s("li",[t._v("Ray engine: Uses "),s("a",{attrs:{href:"https://ray.readthedocs.io/en/latest/tune.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Ray tune"),s("OutboundLink")],1),t._v("\n("),s("a",{attrs:{href:"https://ray.readthedocs.io/en/latest/tune/api_docs/execution.html#tune-run",target:"_blank",rel:"noopener noreferrer"}},[t._v("Argument reference"),s("OutboundLink")],1),t._v(")")])]),t._v(" "),s("h3",{attrs:{id:"version"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#version"}},[t._v("#")]),t._v(" version")]),t._v(" "),s("p",[s("code",[t._v("version(self, config=None)")])]),t._v(" "),s("p",[t._v("Applies a configuration update")]),t._v(" "),s("p",[t._v("Selected components use the default configuration as specified in the machinable.yaml.\nVersioning allows for configuration overrides using dictionaries or defined version patterns.\nThe versions here are applied globally to all components in this experiment. If you\nwant to apply the version locally, use the version parameter in the local method.")]),t._v(" "),s("h4",{attrs:{id:"arguments-8"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arguments-8"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("config")]),t._v(": Configuration update dictionary")])]),t._v(" "),s("h4",{attrs:{id:"examples-5"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples-5"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" machinable "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Experiment\nexperiment "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Experiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'evolution'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sgd'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#### use a dictionary to override configuration values")]),t._v("\nexperiment"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("version"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'shuffle'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'lr'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.01")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);