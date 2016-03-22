import read from 'vinyl-read';
import Task from './task';
import path from 'path';
import plugin from './plugin';
import fs from 'fs';

class System {
  constructor(tasks = {}, name = 'osia') {
    this.tasks = tasks;
    this.name = name;
    this._startTime = process.hrtime();
  }

  task(...args) {
    let route = null;
    let deps = null;
    let fn = function fn() {};

    if (args.length === 2) [route, fn] = args;
    else if (args.length === 3) [route, deps, fn] = args;

    this.tasks[route] = new Task(route, fn, deps);
  }

  run(route = 'default', opts, args) {
    this.tasks[route].start(opts, args);
  }

  log(message) {
    console.log(`[${this.name}] ${message}`);
  }

  error(message) {
    console.log(`[${this.name}] ${message}`);
    throw new Error(message, this.name);
  }

  open(files) {
    return read(files);
  }

  save(base) {
    return plugin((file, resolve, reject) => {
      file.dirname = path.resolve(base);
      fs.writeFile(file.path, file.contents,
        (err) => (err ? reject(err) : resolve(file))
      );
    });
  }
}

export default System;
