# Writing Plugins
Writing plugins in Osia is easy when using [`osia-plugin`][osia-plugin]...  This module prepares a file-routine for you, making the whole process a little bit easier and cleaner....  Osia is also based on top of [vinyl files][vinyl], so it would be good to learn those if you don't know them already...

Plugins take a vinyl file, alter it, and then pass it on.  This is all plugins do at the core of things.

Most plugins follow the same basic structure:
```javascript
const plugin = require('osia-plugin');

function myPlugin(options) {
  // Prepare plugin...

  return plugin(file => {
    // ...
  });
}
```

From here, you can decide whether to use it asynchronously or synchronously...

## Asynchronous Plugins
Using plugins asynchronously is great, since Osia is based on top of `Promise` objects...  It also uses `promise-routine` to have them done concurrently.

In order to write an asynchronous plugin, we need to add a few more arguments to our `plugin()` function:
```javascript
function myPlugin(options) {
  return plugin((file, resolve, reject) => {
    // ...
  });
}
```
In order to use this correctly, we need to pass on file. So once we are done altering the file asynchronously, we need to call `resolve(file)`...  For example:
```javascript
function myPlugin(options) {
  return plugin((file, resolve) => {
    foobar.render(file.contents).then(result => {
      file.contents = result;
      resolve(file);
    });
  });
}
```

## Synchronous Plugins
Though asynchronous plugins are encouraged, there is not always an option...  Sometimes compilers are asynchronous.

Writing synchronous plugins is just as simple (if not simplier) than writing asynchronous plugins...  Instead of `resolve`'ing a file, you simply return it:
```javascript
function myPlugin(options) {
  return plugin(file => {
    file.contents = foobar.render(file.contents);
    return file;
  });
}
```

## Usage
Both of these would have the same usage:
```javascript
// ...
const myPlugin = require('my-plugin');

osia.task('foobar', () => {
  return osia.open('src/*.foo')
    .then(myPlugin({ options }))
    .then(...);
});
```

 [vinyl]: https://github.com/gulpjs/gulp
 [osia-plugin]: https://github.com/seanc/osia-plugin
