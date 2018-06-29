"use strict";

class InvalidArgumentError extends Error {
  constructor(...params) {
    super(...params);

    this.name = 'InvalidArgumentError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidArgumentError);
    }
  }
}

class ParserError extends Error {
  constructor(c = '', ...params) {
    super(...params);

    this.name = 'ParserError';
    this.character = c;
    this.message = `invalid character \`${this.character}\``;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidArgumentError);
    }
  }
}

module.exports = { InvalidArgumentError, ParserError };
