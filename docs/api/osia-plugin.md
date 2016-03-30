## [`plugin(callback)`][osia-plugin]
Prepare a file-routine that can operate asynchronously or synchronously.
 - `callback` (`function`): The callback function of the routine.

## `callback(file, [resolve, reject])`
 - `file` ([`File`][vinyl]): A vinyl file to use/alter.
 - `resolve` (`function`): Resolve the routine promise asynchronously.
 - `reject` (`function`): Reject the routine promise asynchronously.

To use synchronously, use `return` and `throw` instead of `resolve` and `reject`.

## Usage
```javascript
const plugin = require('osia-plugin');

function example() {
  return plugin((file, resolve, reject) => {
    // ...
  });
}
```

 [osia-plugin]: https://github.com/seanc/osia-plugin
 [vinyl]: https://github.com/gulpjs/vinyl
