import System from './system';
import Task from './task';
import plugin from './plugin';

const osia = new System();

// Objects
osia.System = System;
osia.Task = Task;

// Functions
osia.plugin = plugin;

export default osia;
