class Task {
  constructor(name, fn) {
    this.process = null;
    this.name = name;
    this.fn = fn;
  }

  /** Start the task. */
  start(opts = {}, args = []) {
    // Start process.
    this.process = Promise.resolve({ opts, args })
    .then(({ o, a }) => this.fn(o, a, this));

    // Monitor errors.
    this.process.catch(this.error);

    // Pass promise to 3d parties.
    return this.process;
  }

  /** Log */
  log(message) {
    console.log(`[${this.name}] ${message}`);
  }

  /** Trigger a plugin error. */
  error(err) {
    console.log(`[${this.name}] ${err.name}: ${err.message}`);
    throw err;
  }
}

export default Task;
