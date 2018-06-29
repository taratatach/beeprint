"use strict";

const { expect } = require('chai');

const Digit = require('../src/digit');
const { InvalidArgumentError } = require('../src/errors');

describe('Digit', function() {
  context('not instanciated with an integer', function() {
    it('throws an InvalidArgumentError', function() {
      const args = [
        undefined,
        '',
        '1'
      ];

      for(let arg of args) {
        let thrown = false;

        try {
          new Digit(arg);
        } catch(e) {
          thrown = true;
          expect(e).to.be.an.instanceOf(InvalidArgumentError);
        }
        expect(thrown).to.be.true;
      }
    });
  });

  context('instanciated with an integer', function() {
    beforeEach(function() {
      this.digit = new Digit(5);
    });

    it('has a non-empty top property', function() {
      expect(this.digit).to.have.property('top');
      expect(this.digit.top).to.not.be.empty;
    });

    it('has a non-empty middle property', function() {
      expect(this.digit).to.have.property('middle');
      expect(this.digit.middle).to.not.be.empty;
    });

    it('has a non-empty bottom property', function() {
      expect(this.digit).to.have.property('bottom');
      expect(this.digit.bottom).to.not.be.empty;
    });

    it('is the LCD representation of the integer', function() {
      const integers = [
        { v: 0, top: " _ ", middle: "| |", bottom: "|_|" },
        { v: 5, top: " _ ", middle: "|_ ", bottom: " _|" },
        { v: 9, top: " _ ", middle: "|_|", bottom: "  |" },
      ];

      for(let i of integers) {
        const digit = new Digit(i.v);

        expect(digit.top).to.eq(i.top);
        expect(digit.middle).to.eq(i.middle);
        expect(digit.bottom).to.eq(i.bottom);
      }
    });

    context('below 0', function() {
      it('throws an InvalidArgumentError', function() {
        let thrown = false;

        try {
          new Digit(-1);
        } catch(e) {
          thrown = true;
          expect(e).to.be.an.instanceOf(InvalidArgumentError);
        }
        expect(thrown).to.be.true;
      });
    });

    context('above 9', function() {
      it('throws an InvalidArgumentError', function() {
        let thrown = false;

        try {
          new Digit(10);
        } catch(e) {
          thrown = true;
          expect(e).to.be.an.instanceOf(InvalidArgumentError);
        }
        expect(thrown).to.be.true;
      });
    });
  });
});
