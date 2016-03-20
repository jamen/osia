# CLI
Osia has a simple or complex CLI, depending on how you want to use it.

## Quick-running (Gulp-like)
This method disregards options and arguments completely:
```
$ osia foo bar
```
This runs the tasks `foo` and `bar`.

## Singular Task Arguments and Options
Because of the quick-running syntax, you need to use a flag if you are running one task and also want to use arguments and options:
```
$ osia -i foo "bar" --baz
```
The `-i` flag turns on arguments and options.

## Multiple Task Arguments and Options
Since Osia's CLI is partially designed on top of [cli-list][cli-list], you do not have to specify `-i` when using arguments and options when you are using multiple tasks at once (and not in quick-running style):
```
$ osia foo --bar, baz "qux"
```

[cli-list]: https://github.com/jamen/cli-list
