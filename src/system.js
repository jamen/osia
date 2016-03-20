import read from 'vinyl-read';
import Task from './task';
import p from 'path';
import plugin from './plugin';
import fs from 'fs';

class System {
  constructor(tasks = {}, plugins = {}, name = 'osia') {
    this.tasks = tasks;
    this.plugins = plugins;
    this.name = name;
    this._startTime = process.hrtime();
  }

  /** Create a task. */
  task(...args) {
    let path = null;
    let deps = null;
    let fn = function fn() {};

    if (args.length === 2) [path, fn] = args;
    else if (args.length === 3) [path, deps, fn] = args;

    path = path.split(':');
    const name = path[0];
    let sel = this.tasks;

    for (const item of path) {
      sel[item] = {};
      sel = sel[item];
    }

    sel[name] = new Task(name, fn, deps);
    return fn;
  }

  /** Run a task. */
  run(path = 'default', opts, args) {
    const task = this._nameToTask(path);
    const meta = {
      at: process.hrtime(this._startTime)[1],
    };
    return Promise.all(
      (task.deps || []).map(dep => this._nameToTask(dep).start(opts, args, meta))
    ).then(() => task.start(opts, args, meta));
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

  save(base) {
    return plugin((file, resolve, reject) => {
      file.base = p.resolve(base);
      fs.writeFile(file.path, file.contents,
        (err) => (err ? reject(err) : resolve(file))
      );
    });
  }

  _nameToTask(path) {
    const parts = path.split(':');
    const name = parts[0];
    let sel = this.tasks;

    for (const item of parts) {
      sel = sel[item];
    }

    // task
    return sel[name];
  }
}

export default System;
