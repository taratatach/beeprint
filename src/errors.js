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

module.exports = { InvalidArgumentError };
