# Getting Started
Osia is used for declaring and running tasks inside JavaScript, most commonly as a _build tool_...  At that, Osia is very similar to [Gulp][gulp], and even uses [vinyl files][vinyl] internally.  Osia differs in that it is based on top of [`Promise` objects][Promise] instead of streams, and also aims to keep [minimal dependencies][deps] (ultimately making it smaller, and maybe faster, than Gulp).

## Installation
Osia is typically installed and saved as a developer dependency, since it is used for building commonly:
```shell
$ npm install --save-dev osia
```
You might also want to install once globally, so you can use the CLI:
```shell
$ npm install --global osia
```
From here you can use the `--help` flag on the CLI:
```shell
$ osia --help
```

## Setting up
If you are using Osia in a project, it is wise to install using `--save-dev` (or `--save`) to automatically add it into your `package.json` as a dependency; however, if you didn't, you should add it in... Once you have installed and saved as a dependency, all you need is an `osia.js` file to get started.  This is where you define tasks to be ran via the CLI...

## Using the System
So, in our `osia.js` file, we first have to require Osia...  From there, we can give the system a name:
```javascript
const osia = require('osia');
osia.name('my-app');
```
(Note that `osia` is an instance of [`System`](api/System.md))

With `osia`, we can define tasks, using the `.task` method:
```javascript
osia.task('foo', () => {
  // ...
});
```

We can also cluster tasks:
```javascript
osia.task('foo', ['bar', 'baz']);
```
(Where `foo` will start `bar` and `baz`).

You can also have _task dependencies_, to wait for other tasks to start:
```javascript
osia.task('foo', () => { /* ... */ });

osia.task('bar', ['foo'], () => {
  // ...
});
```
(Where `bar` will start `foo` if it is not running/ran already)

## Using Tasks
In Osia, tasks run asynchronously using `Promise` objects, but it needs to be passed on in order to track it correctly, so we have to return a _promise pipeline_:
```javascript
osia.task(name, () => {
  return somePromise();
});
```
This will allow the system to detect when it finishes (which is important with task dependencies and timing).

If you are using Osia as a build tool, you will most likely want to open, alter, and then save files.  Osia offers two small internal plugins for opening and saving files.  [`System#open` and `System#save`](api/System.md)...  Where `System#open` starts a promise pipeline of vinyl files:
```javascript
osia.task('javascript', () => {
  return osia.open('src/*.js')
    .then(babel({ presets: ['es2015'] }))
    .then(osia.save('lib'));
})
```
You use `Promise#then` to pass vinyl files down the pipeline, which plugins can alter and change, until you eventually save them with `System#save`.

You can also use the name `'default'`, which is ran when no tasks are provided (`$ osia`).

## Running Tasks
Now that you have defined a task, you can run it using the CLI:
```javascript
$ osia [...tasks]
```
So, in our case, we can run our compilation task with:
```
$ osia javascript
```

You can also run multiple tasks concurrently:
```
$ osia javascript sass pug
```

If you need to, for any reason, run tasks programmatically, you can use `System#start`:
```javascript
osia.start(['javascript', 'sass', 'pug']).then(...);
```

### Next up: [Using Plugins][using-plugins]

## Also See
 - [`System`](api/System.md)
 - [`vinyl` (external)][vinyl]

 [gulp]: https://github.com/gulpjs/gulp
 [vinyl]: https://github.com/gulpjs/vinyl
 [Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 [deps]: https://github.com/jamen/osia/blob/master/package.json#L34-L40
 [using-plugins]: using-plugins.md
