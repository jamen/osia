import read from 'vinyl-read';
import Task from './task';

class System {
  constructor(tasks = {}, plugins = {}, name = 'osia') {
    this.tasks = tasks;
    this.plugins = plugins;
    this.name = name;
    this._startTime = process.hrtime();
  }

  /** Create a task. */
  task(name, fn) {
    const path = name.split(':');
    const prop = path.splice(-1, 1)[0];
    let sel = this.tasks;

    for (const item of path) {
      sel[item] = {};
      sel = sel[item];
    }

    sel[prop] = new Task(name, fn);
    return fn;
  }

  /** Run a task. */
  run(path = 'default', opts, args) {
    const parts = path.split(':');
    const name = parts.splice(-1, 1)[0];
    let sel = this.tasks;

    for (const item of parts) {
      sel = sel[item];
    }

    const task = sel[name];

    return task.start(opts, args, { at: process.hrtime(this._startTime)[1] });
  }

  /** Log */
  log(message) {
    console.log(`[${this.name}] ${message}`);
  }

  /** System error */
  error(message) {
    console.log(`[${this.name}] ${message}`);
    throw new Error(message, this.name);
  }

  /** Open file(s), starting a Promise chain. */
  open(files) {
    return read(files);
  }
}

export default System;
