# Features

### Sub-Tasking (Groups)
Sub-tasking (grouping) allows you to define multiple tasks in a namespace, then run all the tasks under that namespace.

API usage:
```javascript
osia.task('foo:bar', () => ...);
osia.task('foo:qux', () => ...);
```

CLI usage:
```
$ osia foo
// starts foo:bar and foo:qux
```

### Babeling `osia.js`
Osia allows you to use Babel to transpile your `osia.js` configuration under a `-b` or `--babel` flag, but your project must have `babel-require` somewhere (which, if you are using babel it most likely does).  Babel is not a dependency of Osia, as we aim to be lightweight.

CLI usage:
```
$ osia -b foo
$ osia --babel foo
```

### Task Options and Arguments
You can supply options and arguments to tasks to create a more dynamic task file, adding a run-time input method via the CLI or programmatically.

CLI usage:
```
// Singular tasks need -i:
$ osia -i foo "baz" --bar

// Multiple tasks don't need -i:
$ osia foo --bar, baz "qux"
```

The reason you need `-i` for singular tasks is because of quick-running or _Gulp-familiarity_...

These two are the same:
```
$ osia foo, bar
$ osia foo bar
```
But this is not:
```
$ osia -i foo bar
```
