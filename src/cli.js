#!/usr/bin/env node
import osia from '.';
import minimist from 'minimist';
import list from 'cli-list';
import routine from 'promise-routine';
import { join } from 'path';

const args = process.argv.slice(2);
const sets = list(args);
const opts = minimist(args);
const tasks = [];

// Setup CLI for routine
if (sets.length > 1 || opts.i) {
  sets.forEach(set => {
    const mic = minimist(set.slice(1));
    tasks.push([set[0], mic, mic._]);
  });
} else {
  sets[0].forEach(task => tasks.push([task, {}, {}]));
}

// Run the config, which defines the tasks.
require(join(process.cwd(), 'osia.js'));

// Start
routine((...o) => osia.run(...o), ...tasks);
