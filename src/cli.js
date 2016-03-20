#!/usr/bin/env node
import osia from '.';
import minimist from 'minimist';
import list from 'cli-list';
import routine from 'promise-routine';
import { join } from 'path';

const args = process.argv.slice(2);
const opts = minimist(args, { boolean: true });
const sets = list(opts._);
const tasks = [];

if (sets.length > 1 || opts.i) {
  sets.forEach(set => {
    const mic = minimist(set);
    tasks.push([set[0], mic, mic._.slice(1)]);
  });
} else {
  sets[0].forEach(task => tasks.push([task, {}, {}]));
}

if (opts.b || opts.babel) {
  require(require.resolve('babel-register'));
}

require(join(process.cwd(), 'osia.js'));

routine((...o) => osia.run(...o), ...tasks);
