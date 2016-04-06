'use strict';

const read = require('vinyl-file').read;
const glob = require('glob-promise');
const write = require('vinyl-write');
const watch = require('chokidar').watch;
const Task = require('./task');
const path = require('path');
const routine = require('promise-routine');
const timer = require('./timer');
const mkdirp = require('mkdirp-promise');
const m = require('./message');

class System {
  constructor(tasks, meta) {
    this.tasks = tasks || {};
    this.meta = meta || { name: 'osia' };

    // System naming conviention
    if (this.meta.name) this.meta.name = `~${this.meta.name}`;
  }

  task() {
    const args = Array.prototype.slice.call(arguments);
    let name = null;
    let deps = [];
    let fn = () => {};

    // Flexible arguments.
    if (args.length === 2) {
      name = args[0];
      fn = args[1];
    } else if (args.length === 3) {
      name = args[0];
      deps = args[1];
      fn = args[2];
    }

    // Function-less tasks (point to other tasks).
    if (Array.isArray(fn)) {
      const de = fn;
      fn = () => Promise.all(de.map(d => this._startAfterDeps(d)));
    }

    // Create task
    this.tasks[name] = new Task(fn, {
      name,
      deps,
      color: this.meta.color,
    });
  }

  start(tasks) {
    tasks = tasks || ['default'];

    // Setup tasks and timer
    if (typeof tasks === 'string') tasks = [tasks];
    const results = timer(this);

    // Handle ending
    return routine(this._startAfterDeps, tasks, this).then(x => {
      results();
      return x;
    });
  }

  open(globs) {
    // Read file, creating promise pipeline
    return routine(glob, [globs]).then(files => routine(read, files));
  }

  save(base) {
    // Create file-routine to change directory and write.
    return files => routine(file => {
      file.dirname = path.resolve(base);
      return mkdirp(file.dirname).then(() => write(file));
    }, files);
  }

  watch(paths, tasks, options) {
    return routine(file => new Promise((_, reject) => {
      const watcher = watch(file, options);
      watcher.on('all', () => routine(this._startAfterDeps, tasks.map(t => [t, true]), this));
      watcher.on('error', err => reject(err));
    }), [paths]);
  }

  _startAfterDeps(taskName, force) {
    // Get task and setup vars
    const task = this.tasks[taskName];
    const depTasks = [];
    let dep = null;

    // Make sure task is valid
    if (typeof task === 'undefined') {
      console.log(m(this.meta.name, `Task '${taskName}' not found!`));
      return Promise.resolve({ name: taskName, message: 'not found' });
    }

    // Loop through task deps, decide whether they need to be started/pended on.
    for (const depName of task.meta.deps) {
      dep = this.tasks[depName];

      switch (dep.state) {
        case 'running':
          depTasks.push(dep.process);
          break;
        case 'ran':
          continue;
        default:
          depTasks.push(this._startAfterDeps(depName));
      }
    }

    // Wait on deps and start.
    return Promise.all(depTasks).then(() => (
      task.state === 'off' || (force && task.state === 'ran')
      ? task.start()
      : task.process
    ));
  }

  // Small system naming function.
  name(x) { this.meta.name = `~${x}`; }
}

module.exports = System;
