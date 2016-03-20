import { blue, green, red } from 'chalk';

class Task {
  constructor(name, fn, deps) {
    this.process = null;
    this.name = name;
    this.deps = deps;
    this.fn = fn;
  }

  /** Start the task. */
  start(opts = {}, args = [], meta = {}) {
    this.log(`starting ${meta.at && `(at ${meta.at / 1000000}ms`})`);
    const timer = process.hrtime();

    // Start process.
    this.process = Promise.resolve({ opts, args })
    .then(({ o, a }) => this.fn(o, a, this));

    // Monitor errors.
    this.process.catch(this.error);

    // Pass promise to 3d parties.
    return this.process.then(data => {
      const [, nano] = process.hrtime(timer);
      this.log(`finished in ${nano / 1000000}ms`);
      return data;
    });
  }

  /** Log */
  log(message) {
    console.log(`${blue(`[${this.name}]`)} ${green(message)}`);
  }

  /** Trigger a plugin error. */
  error(err) {
    console.log(`${blue(`[${this.name}]`)} ${red(err.name) + green(':')} ${red(err.message)}`);
    throw err;
  }
}

export default Task;
