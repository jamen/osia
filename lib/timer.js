'use strict';

const m = require('./message');

module.exports = function timer(item) {
  console.log(m(`${item.meta.name}`, 'Starting', '', item.meta.color));
  const time = process.hrtime();
  return () => {
    const nano = process.hrtime(time)[1];
    console.log(m(`${item.meta.name}`, 'Finished', `(in ${nano / 1000000}ms)`, item.meta.color));
  };
};
