import System from './system';
import Task from './task';
import plugin from './plugin';

const osia = new System();

osia.System = System;
osia.Task = Task;
osia.plugin = plugin;

export default osia;
