import read from 'vinyl-read';
import Task from './task';
import path from 'path';
import plugin from './plugin';
import fs from 'fs';
import routine from 'promise-routine';

class System {
  constructor(tasks = {}, plugins = {}, name = 'osia') {
    this.tasks = tasks;
    this.plugins = plugins;
    this.name = name;
    this._startTime = process.hrtime();
  }

  /** Create a task. */
  task(...args) {
    let route = null;
    let deps = null;
    let fn = function fn() {};

    if (args.length === 2) [route, fn] = args;
    else if (args.length === 3) [route, deps, fn] = args;

    const parts = route.split(':');
    const name = parts.splice(-1, 1);
    let sel = this.tasks;

    for (const item of parts) {
      if (typeof sel[item] === 'undefined') sel[item] = {};
      sel = sel[item];
    }

    // task
    sel[name] = new Task(name, fn, deps);
  }

  /** Run a task. */
  run(route = 'default', opts, args) {
    const task = this._nameToTask(route);
    console.log(task);
    if (!(task instanceof Task)) {
      return routine(t => this.run(`${route}:${t}`), ...Object.keys(task));
    }
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
      file.base = path.resolve(base);
      fs.writeFile(file.path, file.contents,
        (err) => (err ? reject(err) : resolve(file))
      );
    });
  }

  _nameToTask(route) {
    const parts = route.split(':');
    const name = parts.splice(-1, 1);
    let sel = this.tasks;

    for (const item of parts) {
      sel = sel[item];
    }

    // task
    return sel[name];
  }
}

export default System;
