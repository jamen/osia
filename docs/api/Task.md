## `new Task(fn, [meta])`
A task holds a process, and can be started on command.
 - `fn` (`function`): The task's process.
 - `meta` (`Object`): Metadata information about the task.
 - `meta.name` (`String`): Name of the task
 - `meta.deps` (`Array`): Dependencies of the task.

### `Task#start()`
Start the task process.

Returns `Promise`.

## Instance data
 - `task.fn (`function`)`: The _queued_ process
 - `task.process` (`Promise`): The current process (returned by `Task#start`)
 - `task.state` (`String`): The state of the task, either `'off'`, `'running'`, or `'ran'`.
