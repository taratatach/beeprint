"use strict";

const { expect } = require('chai');

const StringParser = require('../src/stringParser');
const Digit = require('../src/digit');
const { InvalidArgumentError, ParserError } = require('../src/errors');

describe('StringParser', function() {
  beforeEach(function() {
    this.parser = new StringParser();
  });

  describe('parse()', function() {
    context('without arguments', function() {
      it('throws an InvalidArgumentError', function() {
        expect(this.parser.parse).to.throw(InvalidArgumentError);
      });
    });

    context('with non-digit characters', function() {
      const tests = [
        { n: '1a2', c: 'a' },
        { n: '1 2', c: ' ' },
        { n: '1+2', c: '+' },
        { n: '1a2b', c: 'a' },
      ];

      tests.forEach(function(test) {
        it(`throws a ParserError for invalid character ${test.c} in ${test.n}`, function() {
          expect(this.parser.parse.bind(null, test.n)).to.throw(ParserError);
          try {
            this.parser.parse(test.n);
          } catch(e) {
            expect(e.message).to.eq(`invalid character \`${test.c}\``);
          }
        });
      });
    });

    context('with digits only', function() {
      beforeEach(function() {
        this.numbers = [
          "",
          "1",
          "0123456789",
        ];
      });

      it('returns a list of as many Digits', function() {
        for(let n of this.numbers) {
          const result = this.parser.parse(n);

          expect(result).to.have.lengthOf(n.length);

          for(let d of result) {
            expect(d).to.be.an.instanceOf(Digit);
          }
        }
      });
    });
  });
});
