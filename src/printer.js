"use strict";

const { ParserError } = require('./errors');

class Printer {
  constructor({ parser, separator = ' ' }) {
    this.parser = parser;
    this.separator = separator;

    this.print = this.print.bind(this);
    this.line = line.bind(this, this.separator);
  }

  print(number) {
    try {
      const digits = this.parser.parse(number);

      console.log(this.line('top', digits));
      console.log(this.line('middle', digits));
      console.log(this.line('bottom', digits));
    } catch(e) {
      if (e instanceof ParserError) {
        console.error(`Could not parse ${number}: ${e.message}`);
      } else {
        throw e;
      }
    }
  }
}

function line(separator, property, digits) {
  return digits.map(digit => digit[property]).join(separator);
}

module.exports = Printer;
