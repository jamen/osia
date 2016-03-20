# `System(tasks = {}, name = 'osia')`
The `System` class organizes tasks, and allows you do to things like grouping.
 - `tasks` (Object): Preset tasks.
 - `name` (String): Name of the system.

### `System#task(name, fn)`
### `System#task(name, deps, fn)`
Define a [`Task`][task] in the system.
 - `name` (String): Name/route of task.
 - `deps` (Array): Dependency tasks (run after). Optional
 - `fn` (Function): The callback to execute the task.

#### `fn(options, arguments)`
The callback of a task.
 - `options` (Object): Objects passed into task.
 - `arguments` (Array): Arguments passed into task.

### `System#run(name, options, arguments)`
Run a task (or group) defined in the system.
 - `name` (String): Name/route of task or group.
 - `options` (Object): Options for task.
 - `arguments` (Array): Arguments for task.

### `System#open(path)`
Open a file into a [vinyl file][vinyl], starting a `Promise` pipeline.
 - `path` (String|Array): String file path or glob, or array of strings.

### `System#save(directory)`
Save a pipeline of [vinyl files][vinyl] as files into `directory`.
 - `directory` (String): String path of directory to put files.

[task]: Task.md
[vinyl]: https://github.com/gulpjs/vinyl
