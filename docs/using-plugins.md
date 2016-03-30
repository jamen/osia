# Using Plugins
Using plugins in Osia is essential to a clean and fast workflow.  Plugins can be [browsed on npm][osia-plugins] (from the "osia" keyword).  Don't recreate what is already done.

Osia plugins are prefixed with `osia-` (i.e. `osia-sass`, `osia-babel`), but are typically required as their suffix (`sass` and `babel` respectively)...  For example:
```javascript
const osia = require('osia');
const babel = require('osia-babel');
```

The usage depends on the plugin, although must plugins follow a similar style...  Where you require a function that can be called in the pipeline with options:
```javascript
const osia = require('osia');
const babel = require('osia-babel');

osia.task('foo', () => {
  return osia.open('src/*.js')
    .then(babel({ presets: ['es2015'] }))
    .then(osia.save('lib'))
});
```
This is much like Gulp.

 [osia-plugins]: https://www.npmjs.com/browse/keyword/osia
