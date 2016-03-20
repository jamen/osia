# Writing Plugins
Osia has a small utility to make common plugin writing a better experience, called `osia.plugin`.  It is a function on the main module.

This function prepares a file-routine for you, and provides some more flexible syntax...

Here is an example using `osia.plugin` asynchronously:
```javascript
import { plugin } from 'osia';

export default function foo(opts = {}) {
  return plugin((file, resolve, reject) => {
    foobar.render(file.contents, (err, output) => {
      if (err) reject(err);
      else {
        file.contents = output;
        resolve(file);
      }
    });
  });
}
```

Here is an example using it synchronously:
```javascript
import { plugin } from 'osia';

export default function foo(opts = {}) {
  return plugin(file => {
    file.contents = foobar.renderSync(file.contents);
    return file;
  });
}
```

## Related
 - [`plugin`](api/plugin.md)
