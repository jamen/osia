#!/usr/bin/env node
import osia from '.';
import minimist from 'minimist';
import { join } from 'path';

// Create CLI
const opts = minimist(process.argv.slice(2), {
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

// Tasks, use "default" if none.
const tasks = opts._;
if (!tasks.length) tasks.push('default');

// Enable babel
if (opts.babel) require(require.resolve('babel-register'));

// Show version
if (opts.version) {
  console.log(`v${require('../package.json').version}`);
  process.exit(0);
}

// Help page
if (opts.help) {
  console.log(`
  Usage:
    osia [...tasks]

  Options:
    --help, -h     Show this page.
    --version, -v  Show Osia version.
    --babel, -b    Use babel-register in task file.
    --no-color     Disable colorful logging
  `);
  process.exit(0);
}

// Propagate color on/off in system.
osia.meta.color = opts.color;

// Start Osia
require(join(process.cwd(), 'osia.js'));
osia.start(tasks);
