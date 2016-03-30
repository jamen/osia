import read from 'vinyl-read';
import write from 'vinyl-write';
import Task from './task';
import path from 'path';
import routine from 'promise-routine';
import timer from './timer';
import mkdirp from 'mkdirp-promise';
import m from './message';

class System {
  constructor(tasks = {}, meta = { name: 'osia' }) {
    this.tasks = tasks;
    this.meta = meta;

    // System naming conviention
    if (this.meta.name) this.meta.name = `~${this.meta.name}`;
  }

  task(...args) {
    let name = null;
    let deps = [];
    let fn = () => {};

    // Flexible arguments.
    if (args.length === 2) [name, fn] = args;
    else if (args.length === 3) [name, deps, fn] = args;

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

  start(tasks = ['default']) {
    // Setup tasks and timer
    if (typeof tasks === 'string') tasks = [tasks];
    const results = timer(this);

    // Handle ending
    return routine(this._startAfterDeps.bind(this), ...tasks).then(x => {
      results();
      return x;
    });
  }

  open(files) {
    // Read file, creating promise pipeline
    return read(files);
  }

  save(base) {
    // Create file-routine to change directory and write.
    return files => routine(file => {
      file.dirname = path.resolve(base);
      return mkdirp(file.dirname).then(() => write(file));
    }, ...files);
  }

  _startAfterDeps(taskName) {
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
      task.state === 'off'
      ? task.start()
      : task.process
    ));
  }

  // Small system naming function.
  name(x) { this.meta.name = `~${x}`; }
}

export default System;
