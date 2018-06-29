"use strict";

const { expect } = require('chai');
require('mocha-sinon');

const Printer = require('../src/printer');
const StringParser = require('../src/stringParser');
const Digit = require('../src/digit');

describe('Printer', function() {
  context('not instanciated with an options object', function() {
    it('throws an error', function() {
      let thrown = false;

      try {
        this.printer = new Printer();
      } catch(e) {
        thrown = true;
      }
      expect(thrown).to.be.true;
    });
  });

  context('instanciated with an options object', function() {
    beforeEach(function() {
      this.printer = new Printer({});
    });

    it('has a parser property', function() {
      expect(this.printer).to.have.property('parser');
    });

    it('has a separator property', function() {
      expect(this.printer).to.have.property('separator');
    });

    it('responds to print()', function() {
      expect(this.printer).to.respondTo('print');
    });
  });

  describe('separator', function() {
    it('is retrieved from the constructor options', function() {
      const printer = new Printer({ separator: '+' });
      expect(printer.separator).to.eq('+');
    });

    it('is an empty space by default', function() {
      const printer = new Printer({});
      expect(printer.separator).to.eq(' ');
    });
  });

  describe('parser', function() {
    it('is retrieved from the constructor options', function() {
      const parser = new StringParser();
      const printer = new Printer({ parser });
      expect(printer.parser).to.eq(parser);
    });
  });

  describe('print()', function() {
    context('if parser does not respond to parse()', function() {
      beforeEach(function() {
        this.parser = {};
      });

      it('throws an error', function() {
        const printer = new Printer({ parser: this.parser });
        expect(printer.print).to.throw();
      });
    });

    context('if parser responds to parse()', function() {
      beforeEach(function() {
        this.printer = new Printer({ parser: new StringParser() });
      });

      context('when given a string number argument', function() {
        beforeEach(function() {
          this.sinon.stub(console, 'log');
          this.sinon.spy(this.printer, 'line');
        });

        it('does not throw an error', function() {
          expect(this.printer.print.bind(this.printer, "123")).to.not.throw();
        });

        it('prints the equivalent Digits to stdout on three lines', function() {
          const number = "123";
          const parser = new StringParser();
          const digits = parser.parse(number);

          this.printer.print(number);
          expect(this.printer.line.calledWith('top', digits)).to.be.true;
          expect(this.printer.line.calledWith('middle', digits)).to.be.true;
          expect(this.printer.line.calledWith('bottom', digits)).to.be.true;
          expect(console.log.calledThrice).to.be.true;
        });
      });

      context('when given a string argument not representing a number', function() {
        beforeEach(function() {
          this.sinon.stub(console, 'error');
        });

        it('does not throw an error', function() {
          expect(this.printer.print.bind(this.printer, "1a23")).to.not.throw();
        });

        it('prints an error message to stdout', function() {
          this.printer.print('1a23');
          expect(console.error.calledOnceWith('Could not parse 1a23: invalid character `a`')).to.be.true;
        });
      });
    });
  });

  describe('line()', function() {
    beforeEach(function() {
      this.printer = new Printer({});
    });

    it('expects a property name and an array of objects as arguments', function() {
      const args = [
        ['top', undefined],
        ['top', ""],
        ['top', 12],
        ['top', {}],
        ['top', new Digit(1)],
      ];

      for(let arg of args) {
        expect(this.printer.line.bind(this.printer, ...arg)).to.throw();
      }

      expect(this.printer.line.bind(this.printer, 'top', [new Digit(1)])).to.not.throw();
    });

    it('returns a string', function() {
      const line = this.printer.line('top', []);
      expect(typeof line).to.eq('string');
    });

    const tests = [
      { label: '[]', arg: [], sep: "+", expected: "" },
      { label: '[{ top: "1" }]', arg: [{ top: "1" }], sep: "+", expected: "1" },
      { label: '[{ top: "1" }, { top: "2" }]', arg: [{ top: "1" }, { top: "2" }], sep: " ", expected: "1 2" },
    ];

    tests.forEach(function(test) {
      it(`joins ${test.label} with printer separator \`${test.sep}\` into \`${test.expected}\``, function() {
        const printer = new Printer({ separator: test.sep });
        const line = printer.line('top', test.arg);
        expect(line).to.eq(test.expected);
      });
    });
  });
});
