---
annotations: {
    results: [
        {
          x: 17, 
          y: 19, 
          width: 110,
          height: 25, 
          value: "
          The store folder that has been specified during execution
          "
        },
        {
          x: 49, 
          y: 40, 
          width: 85,
          height: 25, 
          value: "
          The unique 6-digit task ID directory
          "
        },
        {
          x: 85, 
          y: 63,
          width: 125,
          height: 25, 
          value: "
          A unique 12-digit observation directory that stores all data generated by the execution of one of the task's components. This is referred to as an 'observation'
          "
        },
        {
          x: 118, 
          y: 90, 
          width: 160,
          height: 130, 
          value: "
          JSON-encoded configuration, status and system information generated during the execution of the components
          "
        },
        {
          x: 85, 
          y: 242, 
          width: 125,
          height: 50, 
          value: "
          JSON-encoded information of the task and its execution status
          "
        }
    ]
}
---

# Storage

Whenever you execute a task, machinable generates a unique 6-digit task ID (e.g. `9eW1PC`) and creates a new directory of the same name in the specified store location. This directory is used to write all data that is generated by the task, including the used configuration, system metrics, status information and results. More specifically, it may look like this:

<Annotated name="results" :debug="false">

    ~/results
    ├── 9eW1PC
    │   ├── U6RTBBqSwK25/
    │   │   ├── experiment.json
    │   │   ├── status.json
    │   │   ├── node.json
    │   │   ├── flags.json
    │   │   ├── components.json
    │   │   └── host.json
    │   ├── ... 
    │   ├── status.json
    │   └── tasks.json
    └── ...

</Annotated>

While it is possible to read and navigate the folder manually, machinable provides an interface for efficient data retrieval that allows you to query the store like a database.

::: tip
The observation interface is read-only, meaning it will never modify or remove data generated during the execution.
:::

### Example data

To make the exposition less abstract, let's generate some example data using the [functional](../reference/execution.md#functional-api) components code below.

```yaml
# machinable.yaml
components:
  - generate:
      hello: World
      value: 42
```

```python
import machinable as ml

@ml.execute
def main(components, components, observer):
    # Write some log information
    observer.log.info('Hello from the log writer!') 
    
    # write some tabular records
    for i in range(5):
        observer.record['epoch'] = i
        observer.record['acc'] = i * 10
        observer.record.save()
        
    # write some example data
    observer.write('example_data', [1, 2, 3])
    
    print('Execution finished.')
    
main(ml.Experiment('generate').repeat(2), '~/results')
```

The execution output is given below.

```
Experiment: 3K45al (3044900027)
------------

Observation: hYRI2RB0tS9Y (1/2 of task 3K45al)

Execution:
Store: ~/results
Resources: None
Local: True

Component: generate
:: {'GLOBAL_SEED': 3044900027, 'SEED': 1198739929, 'REPEAT_SEED': 1615760268, 'REPEAT_TOTAL': 2, 'REPEAT_NUMBER': 0, 'NAME': 'generate', 'MODULE': 'generate'}
_evaluate: true
hello: World
value: 42

osfs://~/results/3K45al/hYRI2RB0tS9Y; 2020-01-03 22:32:19; INFO: Hello from the log writer!
Execution finished.

Observation: e5JJ4fzhNHgj (2/2 of task 3K45al)

Execution:
Store: ~/results
Resources: None
Local: True

Component: generate
:: {'GLOBAL_SEED': 3044900027, 'SEED': 540601381, 'REPEAT_SEED': 1615760268, 'REPEAT_TOTAL': 2, 'REPEAT_NUMBER': 1, 'NAME': 'generate', 'MODULE': 'generate'}
_evaluate: true
hello: World
value: 42

osfs://~/results/3K45al/e5JJ4fzhNHgj; 2020-01-03 22:32:19; INFO: Hello from the log writer!
Execution finished.

Finished task 3K45al
```

Since the task executes two components, the task directory ``3K45al`` contains two observation directories ``hYRI2RB0tS9Y`` and ``e5JJ4fzhNHgj``. We can now use the observations interface to retrieve the generated data (or observations).

## Loading observations

To load the observations from a store location, instantiate the ``Observations`` interface and add the store location.

```python
from machinable import Observations
mlo = Observations()
mlo.add('~/results')
# or shorter:
mlo = Observations('~/results')
```

::: tip
You can add multiple store locations to the same interface in order to analyse data from different directories in a unified way
:::

machinable will index all directories of the store and cache the data to enable reload-free fast access. If the task is still running, and new data is being generated, you can manually trigger a reload of a store location using the `refresh()` method.

## Working with observations

To retrieve observations, we can use the ``find()`` method that returns observations based on their unique ID.

```python
o = mlo.find('hYRI2RB0tS9Y')
>>> <Observation <hYRI2RB0tS9Y> (3K45al)>
```

The [observation object](../reference/observations.md#observation) then provides convenient access to the observation data.

```python
# used configuration
o.config.hello
>>> 'World'
o.config.value
>>> 42

# log file
o.log
>>> 2020-03-01 22:32:40,339; INFO: Hello from the log writer!

# tabular record data (3rd row)
o.records.find(3)
>>> OrderedDict([('epoch', 3),
                 ('acc', 30),
                 ('_timestamp', datetime.datetime(2020, 1, 3, 22, 32, 19, 622626)),
                 ('_seconds_taken', 0),
                 ('_time_taken', '0.00 second'),
                 ('_total_seconds_taken', 0),
                 ('_total_time_taken', '0.01 second')])

# custom data
o.write('example_data')
>>> [1, 2, 3]

# general information about execution, write and the experiment etc.
o.is_finished()
>>> True
o.store
>>> 'osfs:///home/user/results'
o.task.id
>>> '3K45al'
```

In practice, however, we would rarely select observations based on their ID. Instead, we could retrieve the observations using ``find_by_most_recent_task()`` which returns all observations of the most recently executed task. 

```python
obs = mlo.find_by_most_recent_task()
>>> 'Collection (2) <Observation <hYRI2RB0tS9Y> (3K45al), Observation <e5JJ4fzhNHgj> (3K45al)>'
```

Note that the method returns a [collection](../reference/observations.md#collection) of observation objects rather than a single observation. 

The collection interface forms a wrapper for working with the list of observations and provides a wealth of manipulation operations. For example, we could select the observation that is already finished: 

```python
obs.filter(lambda x: x.is_finished()).first()
```

The [collection reference documentation](../reference/observations.md#collection) provides a comprehensive overview over available options.

In practice, the interfaces allow you to quickly retrieve the data that is needed to analyse the results. Consider the following code block for plotting training performance:

```python
from matplotlib import pyplot

for i, o in enumerate(obs):
    x = range(len(o.records))
    y = o.records.pluck('acc').as_numpy() + i
    label = f"Used seed: {o.flags.SEED}"
    pyplot.plot(x, y, label=label)
    
pyplot.legend()
>>>
```
<img src="/illustrations/observations_plot.png" alt="plot" />

One of the key advantages when working with the observation abstraction is that it removes the overhead of thinking about how the data is actually being stored and read from the disk. Compared with manual result management, it can significantly reduce the effort to organize, retrieve and analyse results.

### Further reading

- Explore the [observations](../reference/observations.md#observations-2) reference documentation to learn about advanced options

- For advanced customized queries, you may use the [query builder](../reference/observations.md#observationsquerybuilder)