import { blue, green, red } from 'chalk';

class Task {
  constructor(name, fn, meta = {}) {
    this.process = null;
    this.name = name;
    this.meta = meta;
    this.deps = meta.deps;
    this.fn = fn;
  }

  start(opts = {}, args = []) {
    const at = process.hrtime(this._systemStartTime)[1];
    this.log(`starting ${at && `(at ${at / 1000000}ms`})`);
    const timer = process.hrtime();

    this.process = Promise.resolve({ opts, args })
    .then(({ o, a }) => this.fn(o, a, this));

    this.process.catch(this.error);

    return this.process.then(data => {
      const [, nano] = process.hrtime(timer);
      this.log(`finished in ${nano / 1000000}ms`);
      return data;
    });
  }

  log(message) {
    console.log(`${blue(`[${this.name}]`)} ${green(message)}`);
  }

  error(err) {
    console.log(`${blue(`[${this.name}]`)} ${red(err.name) + green(':')} ${red(err.message)}`);
    throw err;
  }
}

export default Task;
