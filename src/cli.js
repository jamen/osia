#!/usr/bin/env node
import osia from '.';
import minimist from 'minimist';
import list from 'cli-list';
import routine from 'promise-routine';
import { join } from 'path';

const args = process.argv.slice(2);
const opts = minimist(args, {
  boolean: true,
  default: {
    version: false,
    babel: false,
    help: false,
    color: true,
  },
  alias: {
    version: 'v',
    babel: 'b',
    help: 'h',
    color: 'c',
  },
});
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

if (opts.babel) {
  require(require.resolve('babel-register'));
}

if (opts.version) {
  osia.log(`CLI Version v${require('../package.json').version}`);
}

if (opts.help) {
  console.log(`
  Usage:
    osia [...tasks]
  Options:
    -h --help     Show this message
    -v --version  Show version
    -b --babel    Add babel support
  `);
}

osia.meta.color = opts.color;

require(join(process.cwd(), 'osia.js'));

routine((...o) => osia.run(...o), ...tasks);
