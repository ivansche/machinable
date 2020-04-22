import machinable as ml


def test_local_engine():
    t = ml.Experiment().components("thenode", "thechildren").repeat(2)
    ml.execute(t, engine=None, project="./test_project")


def test_local_engine_multiprocessing():
    t = ml.Experiment().components("thenode", "thechildren").repeat(5)
    ml.execute(t, engine="local:2", project="./test_project")
