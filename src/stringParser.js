"use strict";

const Digit = require('./digit');
const { InvalidArgumentError, ParserError } = require('./errors');

const valid = /[0-9]/;

class StringParser {
  parse(number) {
    if (number === undefined) {
      throw new InvalidArgumentError("unexpected empty number");
    }

    let digits = [];
    for(let c of number) {
      if (!valid.test(c)) {
        throw new ParserError(c);
      }

      digits.push(new Digit(parseInt(c, 10)));
    }
    return digits;
  }
}

module.exports = StringParser;
