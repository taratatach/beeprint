#!/usr/bin/env node

"use strict";

const program = require('commander');

const Printer = require('./src/printer');
const StringParser = require('./src/stringParser');

program
  .version('1.0.0')
  .description('print numbers as LCD characters')
  .usage('<number>');

program
  .option('-s, --separator <chars>', 'character(s) used as separator between each digit')

program.parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  const parser = new StringParser();
  const printer = new Printer({ parser, separator: program.separator });

  printer.print(program.args[0]);
}

