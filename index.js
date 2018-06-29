#!/usr/bin/env node

"use strict";

const program = require('commander');

const StringParser = require('./src/stringParser');

program
  .version('1.0.0')
  .description('print numbers as LCD characters')
  .usage('<number>');

program.parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  const parser = new StringParser();
}
