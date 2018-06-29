"use strict";

const { InvalidArgumentError } = require('./errors');

const map = [
  [
    " _ ",
    "| |",
    "|_|"
  ],
  [
    "   ",
    "  |",
    "  |"
  ],
  [
    " _ ",
    " _|",
    "|_ "
  ],
  [
    " _ ",
    " _|",
    " _|"
  ],
  [
    "   ",
    "|_|",
    "  |"
  ],
  [
    " _ ",
    "|_ ",
    " _|"
  ],
  [
    " _ ",
    "|_ ",
    "|_|"
  ],
  [
    " _ ",
    "  |",
    "  |"
  ],
  [
    " _ ",
    "|_|",
    "|_|"
  ],
  [
    " _ ",
    "|_|",
    "  |"
  ]
];

class Digit {
  constructor(digit) {
    if (typeof digit !== 'number') {
      throw new InvalidArgumentError(`expected number, got ${typeof digit}`);
    }

    if (digit < 0 || digit > 9) {
      throw new InvalidArgumentError("cannot map numbers outside 0-9 range");
    }

    [this.top, this.middle, this.bottom] = map[digit];
  }
}

module.exports = Digit;
