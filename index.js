#!/usr/bin/env node

"use strict";

const program = require('commander');

program
  .version('1.0.0')
  .description('print numbers as LCD characters')
  .usage('<number>');

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
