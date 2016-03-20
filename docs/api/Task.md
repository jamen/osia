# `Task(name, fn, deps)`
A `Task` is like a triggerable named `Promise`.  It holds the function necessary, and can be started at will.
 - `name` (String): Name of task.
 - `fn`: (Function): Task function.
 - `deps` (Array): Task dependency names.

### `Task#start(options = {}, arguments = [], meta = {})`
Start the task.
 - `options` (Object): Options to be passed into task function.
 - `arguments` (Array): Arguments to be passed into task function.
 - `meta` (Object): Meta info about task run.

#### `meta.at`
An integer of the amount of nanoseconds the system has been running when task is started.

### `Task#log(message)`
Log information under the task's name.
 - `message` (String): Message to log.

### `Task#error(err)`
Error under the task.
 - `err` (Error): Error to be logged.
