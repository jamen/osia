# Getting Started
Osia is both a module and a CLI.  You use the module for scripting your tasks, and the CLI to deploy them, it's that simple. Osia's API is also similar to that of [Gulp](http://github.com/gulpjs/gulp)'s.  If you have used Gulp before, the learning curve should be very small.

## Installation
**One-time** CLI install:
```
$ npm install -g osia
```

Saving to your project (should be called per-project):
```
$ npm install --save-dev osia
```

Or, both in one:
```
npm install --save-dev --global osia
```

## Tasking system
Osia works through `Promise` objects...  Tasks in Osia are essentially named and queued promises, and can be started at will (whether it be in JavaScript or the CLI).  A Task defines a function that is later thrown into a `Promise` object when ran.

Here, we can use `osia.open` to read a file and create a [vinyl](https://github.com/gulpjs/vinyl) `File` object, which is then passed down the pipeline to the next function:
```javascript
osia.task('foobar', function foobar() {
  return osia.open('file.js')
  .then(plugin());
});
```
**Note:** We are returning the chain here.  There is very important, so Osia can clean up and give proper results.

The `File` object created from `osia.open` gets "piped" into `plugin()`, where it is altered, and then passed on again, and again, until there are no more operations and the task is finished.

## Using the CLI
Osia's CLI can be simplistic, or adept, depending on how you want to use it, and how you setup your tasks.

But first, we need to create an `osia.js` file, this is the configuration file for Osia's CLI, in this file you define your tasks and use Osia plugins.  For this example, this will be our task:
```javascript
osia.task('foo', () =>
  osia.open('foo.js')
  .then(function(file) {
    console.log(file.contents.toString());
  })
);
```
This task will read a file, log it, and end.

To run this task, we can do the following:
```
$ osia foo
```
As Osia's basic CLI usage follows:
```
$ osia [...tasks]
```

## Options and arguments
A slightly more unique feature to Osia is its dynamic runtime capabilities, put more simply, we can supply options and arguments to tasks right from the CLI to alter their behavior, however, you need to script those behaviors...  For example, we can alter the `osia.js` we previously made, to only log if we supply a `--bar` flag:
```javascript
osia.task('foo', opts =>
  osia.open('foo.js')
  .then(function(file) {
    if (opts.bar) {
      console.log(file.contents.toString());
    }
  })
);
```
(Notice the `opts` in the task's arguments)

Now...  You may be wonder, how do we use this?  Well, we supply the `-i` flag first, then we can use options and arguments:
```
osia -i foo --bar
```

However, when you end up running multiple tasks at the same time that include separate options and arguments, there is no need for the `-i` flag, since Osia uses [cli-list](https://github.com/jamen/cli-list):
```
$ osia foo --bar, baz --qux
```

Arguments are the same as options, except they are primitive values and only in a list...  For instance:
```
$ osia -i foo "Hello"
```

We can handle this in the task:
```javascript
osia.task('foo', (opts, args) =>
  osia.open('foo.js')
  .then(function(file) {
    if (opts.bar) {
      console.log(file.contents.toString(), args[0]);
    }
  })
);
```
Subsequently logging the contents of `foo.js` with `"Hello"`.
