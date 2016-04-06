'use strict';

const timer = require('./timer');

class Task {
  constructor(fn, meta) {
    this.process = null;
    this.meta = meta || {};
    this.meta.deps = this.meta.deps || [];
    this.fn = fn;
    this.state = 'off';
  }

  start() {
    // Setup state and timer.
    this.state = 'running';
    const results = timer(this);

    // Create process, with non-Promise safeguard and error handling.
    this.process = this.fn(this);
    if (!(this.process instanceof Promise)) this.process = new Promise(r => r(this.process));
    this.process.catch(console.error);

    // Update state and print time.
    return this.process.then(data => {
      results();
      this.state = 'ran';
      return data;
    });
  }
}

module.exports = Task;
