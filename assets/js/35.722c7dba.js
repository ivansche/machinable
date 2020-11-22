(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{393:function(e,t,n){"use strict";n.r(t);var a=n(42),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"execution"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#execution"}},[e._v("#")]),e._v(" Execution")]),e._v(" "),n("h2",{attrs:{id:"execute"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#execute"}},[e._v("#")]),e._v(" execute")]),e._v(" "),n("p",[n("code",[e._v("machinable.execute(experiment:Union[machinable.experiment.experiment.Experiment, Any], storage:Union[dict, str]=None, engine:Union[machinable.engine.engine.Engine, str, dict, NoneType]=None, index:Union[machinable.index.index.Index, str, dict, NoneType]=None, project:Union[machinable.project.project.Project, Callable, str, dict]=None, seed:Union[int, NoneType, str]=None) -> machinable.execution.execution.Execution")])]),e._v(" "),n("p",[e._v("Executes a machinable experiment")]),e._v(" "),n("p",[e._v("Schedules the experiment for execution.")]),e._v(" "),n("h3",{attrs:{id:"arguments"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#arguments"}},[e._v("#")]),e._v(" Arguments")]),e._v(" "),n("ul",[n("li",[n("strong",[e._v("experiment")]),e._v(": machinable.Experiment, specifies the execution experiment. For convenience, it can also be a string or tuple that\ndefines the node argument, e.g. "),n("code",[e._v("ml.execute('my_model')")]),e._v(" or "),n("code",[e._v("ml.execute((('my_model', {'param': 1}),))")])]),e._v(" "),n("li",[n("strong",[e._v("storage")]),e._v(": "),n("code",[e._v("String")]),e._v(", URL of the write location for the results. If unspecified, the result write will be\nnon-persistent. Remote locations like SSH or S3 are supported via\n"),n("a",{attrs:{href:"https://pyfilesystem.readthedocs.io/en/latest/filesystems.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("pyFilesystem URLs"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("strong",[e._v("engine")]),e._v(": machinable.Engine|Dict|"),n("code",[e._v("String")]),e._v("|"),n("code",[e._v("None")]),e._v(", engine that handles execution,\ne.g. 'local' or 'ray' etc.")]),e._v(" "),n("li",[n("strong",[e._v("index")]),e._v(": machinable.Index|Dict|"),n("code",[e._v("String")]),e._v("|"),n("code",[e._v("None")]),e._v(", index that tracks this execution")]),e._v(" "),n("li",[n("strong",[e._v("project")]),e._v(": Project|Dict|"),n("code",[e._v("String")]),e._v("|"),n("code",[e._v("None")]),e._v(", project used, defaults to current working directory")]),e._v(" "),n("li",[n("strong",[e._v("seed")]),e._v(": "),n("code",[e._v("Integer")]),e._v("|"),n("code",[e._v("String")]),e._v("|"),n("code",[e._v("None")]),e._v(", determines the global random seed. If "),n("code",[e._v("None")]),e._v(", a random seed will be generated.\nTo re-use the same random seed of a previous execution, you can pass in its "),n("a",{attrs:{href:"."}},[e._v("submission ID")])])]),e._v(" "),n("h3",{attrs:{id:"example"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[e._v("#")]),e._v(" Example")]),e._v(" "),n("div",{staticClass:"language-python extra-class"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("import")]),e._v(" machinable "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("as")]),e._v(" ml\nml"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("execute"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("ml"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("Experiment"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("components"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[e._v("'iris'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[e._v("'random_forest'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[e._v("'s3://bucket'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" seed"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[e._v("42")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])])]),n("h3",{attrs:{id:"functional-api"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#functional-api"}},[e._v("#")]),e._v(" Functional API")]),e._v(" "),n("p",[e._v("You can use this method as a function decorator to implement a custom execution.\nThe decorated function is invoked with the configuration as well as an\nstore object, for example:")]),e._v(" "),n("div",{staticClass:"language-python extra-class"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[n("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[e._v("@ml"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("execute")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("def")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("custom_execute")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("component"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" components"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" store"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    store"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("info"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Custom training with learning_rate='")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("+")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[e._v("str")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("component"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("lr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n\ncustom_execute"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("experiment"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" storage"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" seed"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# invokes the decorated function")]),e._v("\n")])])]),n("h3",{attrs:{id:"using-the-execution"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#using-the-execution"}},[e._v("#")]),e._v(" Using the Execution")]),e._v(" "),n("p",[e._v("This method forms a wrapper around machinable.Execution. You can instantiate\nmachinable.Executon directly with the same argument to benefit from\nmore fine grained execution APIs like asynchronous executon etc.")]),e._v(" "),n("h3",{attrs:{id:"returns"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#returns"}},[e._v("#")]),e._v(" Returns")]),e._v(" "),n("p",[e._v("The execution returns an machinable.Execution object that contains the\nresult of the execution")]),e._v(" "),n("h2",{attrs:{id:"execution-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#execution-2"}},[e._v("#")]),e._v(" Execution")]),e._v(" "),n("p",[n("code",[e._v("machinable.Execution(experiment:Union[machinable.experiment.experiment.Experiment, Callable, Any, NoneType]=<object object at 0x7f9e1b6b6430>, storage:Union[dict, str, NoneType]=None, engine:Union[machinable.engine.engine.Engine, str, dict, NoneType]=None, index:Union[machinable.index.index.Index, str, dict, NoneType]=None, project:Union[machinable.project.project.Project, Callable, str, dict, NoneType]=None, seed:Union[int, str, NoneType]=None)")])]),e._v(" "),n("h3",{attrs:{id:"export"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#export"}},[e._v("#")]),e._v(" export")]),e._v(" "),n("p",[n("code",[e._v("export(self, path=None, overwrite=False)")])]),e._v(" "),n("p",[e._v("Exports the execution")]),e._v(" "),n("p",[e._v("Converts the execution into a plain Python project\nthat can be executed without machinable.")]),e._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),n("p",[e._v("This feature may not work reliably in all circumstances and project use cases")])]),e._v(" "),n("h4",{attrs:{id:"arguments-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#arguments-2"}},[e._v("#")]),e._v(" Arguments")]),e._v(" "),n("ul",[n("li",[n("strong",[e._v("path")]),e._v(": "),n("code",[e._v("String")]),e._v(", directory where exported execution will be stored. If "),n("code",[e._v("None")]),e._v(" defaults to 'exports' in the\ncurrent working directory")]),e._v(" "),n("li",[n("strong",[e._v("overwrite")]),e._v(": "),n("code",[e._v("Boolean")]),e._v(", whether to overwrite an existing export.")])])])}),[],!1,null,null,null);t.default=s.exports}}]);