# `plugin(callback)`
`plugin` (or `osia.plugin`) is a small utility for easily creating file-routines that are either asynchronous or synchronous.  It's simply for removing boilerplate code.
 - `callback`: Callback for routine (the iteration per file).

### `callback(file, resolve, reject)`
This function is called per file, so the operations are done uniformly.
 - `file`: [vinyl `File`][vinyl]
 - `resolve`: Function to resolve asynchronously.
 - `reject`: Function to reject asynchronously.

Synchronous usage would entail using `return` and `throw` instead of `resolve` and `reject`.

## Example
Asynchronous usage:
```javascript
function foobar() {
  return plugin((file, resolve, reject) => {
    bazqux.render(file.contents, (err, data) => {
      if (err) return reject(err);
      file.contents = data;
      resolve(file);
    });
  });
}
```

Synchronous usage:
```javascript
function foobar() {
  return plugin(file => {
    file.contents = bazqux.render(file.contents);
    return file;
  });
}
```
