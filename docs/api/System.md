## `new System(tasks, [meta])`
A system manages and controls [`Task`](Task.md) objects.
 - `tasks` (`Object`): An object of tasks (where the keys are names).
 - `meta` (`Object`): Metadata information about the system.

### `System#task(name, [deps], fn)`
### `System#task(name, tasks)`
Define a new task inside the system.
 - `name` (`String`): Name of the task.
 - `deps` (`Array`): An array of dependency tasks to await on before starting.
 - `fn` (`function`): The task function.

### `System#start(tasks)`
Start a task defined in the system
 - `tasks` (`String`, `Array`): Name or names of tasks to start.

Returns `Promise`.

### `System#name(name)`
Give the system a new name.
 - `name` (`String`): Name to give to the system.
