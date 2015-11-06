'use strict';

import should from 'should';
import Mungo from '../app';
import isDate from './is.date';

class Bar extends Mungo.Model {
  static schema () {
    return {
      string : String
    }
  }
}

describe ( 'Convert' , function () {

  describe ( '<Number>' , function () {

    describe ( '{Number}' , function () {

      describe ( 'Integer' , function () {

        describe ( 'Positive (123)' , function () {

          const converted = Mungo.convert(123, Number);

          it ( 'should be a number' , function () {

            converted.should.be.a.Number();

          });

          it ( 'should be a 123' , function () {

            converted.should.be.exactly(123);

          });

        });

        describe ( 'Negative (-123)' , function () {

          const converted = Mungo.convert(-123, Number);

          it ( 'should be a number' , function () {

            converted.should.be.a.Number();

          });

          it ( 'should be a -123' , function () {

            converted.should.be.exactly(-123);

          });

        });

      });

      describe ( 'Float' , function () {

        describe ( 'Positive' , function () {

          const converted = Mungo.convert(1.99, Number);

          it ( 'should be a number' , function () {

            converted.should.be.a.Number();

          });

          it ( 'should be a 1.99' , function () {

            converted.should.be.exactly(1.99);

          });

        });

        describe ( 'Negative' , function () {

          const converted = Mungo.convert(-1.99, Number);

          it ( 'should be a number' , function () {

            converted.should.be.a.Number();

          });

          it ( 'should be a -1.99' , function () {

            converted.should.be.exactly(-1.99);

          });

        });

      });

      describe ( 'Big number' , function () {

        describe ( 'Big' , function () {

          const converted = Mungo.convert(42e17, Number);

          it ( 'should be a number' , function () {

            converted.should.be.a.Number();

          });

          it ( 'should be a 42e17' , function () {

            converted.should.be.exactly(42e17);

          });

        });

        describe ( 'Small' , function () {

          const converted = Mungo.convert(42e-6, Number);

          it ( 'should be a number' , function () {

            converted.should.be.a.Number();

          });

          it ( 'should be a 42e-6' , function () {

            converted.should.be.exactly(42e-6);

          });

        });

      });

      describe ( 'Precision' , function () {

        const converted = Mungo.convert(1.023616785, Number);

        it ( 'should be a number' , function () {

          converted.should.be.a.Number();

        });

        it ( 'should be a 1.023616785' , function () {

          converted.should.be.exactly(1.023616785);

        });

      });

    });

    describe ( '{String}' , function () {

      describe ( 'numeric string' , function () {

        const converted = Mungo.convert('123', Number);

        it ( 'should be a number' , function () {

          converted.should.be.a.Number();

        });

        it ( 'should be a 123' , function () {

          converted.should.be.exactly(123);

        });

      });

      describe ( 'non-numeric string' , function () {

        it ( 'should be throw an error' , function () {

          () => { Mungo.convert('hello', Number) }.should.throw(Mungo.Error);

        });

      });

    });

    describe ( '{Boolean}' , function () {

      describe ( 'true', function () {

        const converted = Mungo.convert(true, Number);

        it ( 'should be a boolean' , function () {

          converted.should.be.a.Number();

        });

        it ( 'should be a 1' , function () {

          converted.should.be.exactly(1);

        });

      });

      describe ( 'false', function () {

        const converted = Mungo.convert(false, Number);

        it ( 'should be a boolean' , function () {

          converted.should.be.a.Number();

        });

        it ( 'should be a 0' , function () {

          converted.should.be.exactly(0);

        });

      });

    });

    describe ( '{Date}' , function () {

      const converted = Mungo.convert(new Date(), Number);

      it ( 'should be a number' , function () {

        converted.should.be.a.Number();

      });

      it ( 'should be a timestamp' , function () {

        (Date.now() - converted < 10).should.be.true;

      });

    });

    describe ( '{null}' , function () {

      const converted = Mungo.convert(null, Number);

      it ( 'should be a number', function () {

        converted.should.be.a.Number();

      });

      it ( 'should be 0' , function () {

        converted.should.be.exactly(0);

      });

    });

    describe ( '{undefined}' , function () {

      it ( 'should throw error', function () {

        () => { Mungo.convert(undefined, Number) }.should.throw(Mungo.Error);

      });

    });

    describe ( '{Array}' , function () {

      const converted = Mungo.convert([], Number);

      it ( 'should be a number', function () {

        converted.should.be.a.Number();

      });

      it ( 'should be 0', function () {

        converted.should.be.exactly(0);

      });

    });

    describe ( '{Object}' , function () {

      it ( 'should throw error', function () {

        () => { Mungo.convert({}, Number) }.should.throw(Mungo.Error);

      });

    });

    describe ( '{Infinity}' , function () {

      describe ( 'Infinity', function () {

        it ( 'should throw error', function () {

          () => { Mungo.convert(Infinity, Number) }.should.throw(Mungo.Error);

        });

      });

      describe ( '-Infinity', function () {

        it ( 'should throw error', function () {

          () => { Mungo.convert(-Infinity, Number) }.should.throw(Mungo.Error);

        });

      });

    });

    describe ( '{Octal}' , function () {

      const converted = Mungo.convert(0o644, Number);

      it ( 'should be a number', function () {
        converted.should.be.a.Number();
      });

      it ( 'should be 420' , function () {
        converted.should.be.exactly(420);
      });

    });

    describe ( '{Decimal}' , function () {

      const converted = Mungo.convert(0x3e71, Number);

      it ( 'should be a number', function () {
        converted.should.be.a.Number();
      });

      it ( 'should be 15985' , function () {
        converted.should.be.exactly(15985);
      });

    });

    describe ( '{Symbol}' , function () {

      it ( 'should throw an eror', function () {
        () => { Mungo.convert(Symbol(1), Number) }.should.throw(Mungo.Error);
      });
    });

    describe ( '{Function}' , function () {

      it ( 'should throw an eror', function () {
        () => { Mungo.convert(Function, Number) }.should.throw(Mungo.Error);
      });
    });

    describe ( '{Buffer}' , function () {

      it ( 'should throw an eror', function () {
        () => { Mungo.convert(new Buffer(123), Number) }.should.throw(Mungo.Error);
      });
    });

    describe ( '{Binary}' , function () {

      const converted = Mungo.convert(0b11, Number);

      it ( 'should be a number', function () {

        converted.should.be.a.Number();

      });

      it ( 'should be 3', function () {

        converted.should.be.exactly(3);

      });

      describe ( 'base 2', function () {

        const base2 = Mungo.convert(0b0011, Number);

        it ( 'should be a number', function () {

          base2.should.be.a.Number();

        });

        it ( 'should be 3', function () {

          converted.should.be.exactly(3);

        });

      });
    });

    describe ( '{Model}' , function () {

      it ( 'should throw an eror', function () {
        () => { Mungo.convert(new (Mungo.Model)(), Number) }.should.throw(Mungo.Error);
      });

    });

    describe ( '{ObjectID}' , function () {

      it ( 'should throw an eror', function () {
        () => { Mungo.convert(Mungo.ObjectID(), Number) }.should.throw(Mungo.Error);
      });

    });

    describe ( '{Regex}' , function () {

      it ( 'should throw an eror', function () {
        () => { Mungo.convert(/abc/, Number) }.should.throw(Mungo.Error);
      });

    });

    describe ( '{Error}' , function () {

      it ( 'should throw an eror', function () {
        () => { Mungo.convert(new Error('foo'), Number) }.should.throw(Mungo.Error);
      });

    });


  });

  describe ( '<String>' , function () {

    describe ( '{Number}' , function () {

      describe ( 'Integer' , function () {

        describe ( 'Positive -- (123)' , function () {

          const converted = Mungo.convert(123, String);

          it ( 'should be a string' , function () {

            converted.should.be.a.String();

          });

          it ( 'should be a "123"' , function () {

            converted.should.be.exactly("123");

          });

        });

        describe ( 'Negative (-123)' , function () {

          const converted = Mungo.convert(-123, String);

          it ( 'should be a string' , function () {

            converted.should.be.a.String();

          });

          it ( 'should be a "-123"' , function () {

            converted.should.be.exactly("-123");

          });

        });

      });

      describe ( 'Float' , function () {

        describe ( 'Positive (1.99)' , function () {

          const converted = Mungo.convert(1.99, String);

          it ( 'should be a string' , function () {

            converted.should.be.a.String();

          });

          it ( 'should be a "1.99"' , function () {

            converted.should.be.exactly("1.99");

          });

        });

        describe ( 'Negative (-1.99)' , function () {

          const converted = Mungo.convert(-1.99, String);

          it ( 'should be a string' , function () {

            converted.should.be.a.String();

          });

          it ( 'should be a "-1.99"' , function () {

            converted.should.be.exactly("-1.99");

          });

        });

      });

      describe ( 'Big number' , function () {

        describe ( 'Big (42e17)' , function () {

          const converted = Mungo.convert(42e17, String);

          it ( 'should be a string' , function () {

            converted.should.be.a.String();

          });

          it ( 'should be a "4200000000000000000"' , function () {

            converted.should.be.exactly("4200000000000000000");

          });

        });

        describe ( 'Small (42e-6)' , function () {

          const converted = Mungo.convert(42e-6, String);

          it ( 'should be a string' , function () {

            converted.should.be.a.String();

          });

          it ( 'should be a "0.000042"' , function () {

            converted.should.be.exactly("0.000042");

          });

        });

      });

      describe ( 'Precision (1.023616785)' , function () {

        const converted = Mungo.convert(1.023616785, String);

        it ( 'should be a string' , function () {

          converted.should.be.a.String();

        });

        it ( 'should be a "1.023616785"' , function () {

          converted.should.be.exactly("1.023616785");

        });

      });

    });

    describe ( '{String}' , function () {

      const converted = Mungo.convert('abc', String);

      it ( 'should be a string' , function () {

        converted.should.be.a.String();

      });

    });

    describe ( '{Boolean}' , function () {

      describe ( 'true', function () {

        const converted = Mungo.convert(true, String);

        it ( 'should be a string' , function () {

          converted.should.be.a.String();

        });

        it ( 'should be a "true"' , function () {

          converted.should.be.exactly("true");

        });

      });

      describe ( 'false', function () {

        const converted = Mungo.convert(false, String);

        it ( 'should be a string' , function () {

          converted.should.be.a.String();

        });

        it ( 'should be a "false"' , function () {

          converted.should.be.exactly("false");

        });

      });

    });

    describe ( '{Date}' , function () {

      let date = new Date();

      const converted = Mungo.convert(date, String);

      it ( 'should be a string' , function () {

        converted.should.be.a.String();

      });

      it ( 'should be an ISO Date' , function () {

        converted.should.be.exactly(date.toString());

      });

    });

    describe ( '{null}' , function () {

      const converted = Mungo.convert(null, String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be "null"' , function () {

        converted.should.be.exactly("null");

      });

    });

    describe ( '{undefined}' , function () {

      const converted = Mungo.convert(undefined, String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be "undefined"' , function () {

        converted.should.be.exactly("undefined");

      });

    });

    describe ( '{Array}' , function () {

      const converted = Mungo.convert([], String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be ""', function () {

        converted.should.be.exactly("");

      });

    });

    describe ( '{Object}' , function () {

      const converted = Mungo.convert({}, String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be "[object Object]"', function () {

        converted.should.be.exactly("[object Object]");

      });

    });

    describe ( '{Infinity}' , function () {

      describe ( 'Infinity', function () {

        const converted = Mungo.convert(Infinity, String);

        it ( 'should be a string', function () {

          converted.should.be.a.String();

        });

        it ( 'should be "Infinity"', function () {

          converted.should.be.exactly("Infinity");

        });

      });

      describe ( '-Infinity', function () {

        const converted = Mungo.convert(-Infinity, String);

        it ( 'should be a string', function () {

          converted.should.be.a.String();

        });

        it ( 'should be "-Infinity"', function () {

          converted.should.be.exactly("-Infinity");

        });

      });

    });

    describe ( '{Octal}' , function () {

      const converted = Mungo.convert(0o644, String);

      it ( 'should be a string', function () {
        converted.should.be.a.String();
      });

      it ( 'should be "420"' , function () {
        converted.should.be.exactly("420");
      });

    });

    describe ( '{Decimal} (0x3e71)' , function () {

      const converted = Mungo.convert(0x3e71, String);

      it ( 'should be a string', function () {
        converted.should.be.a.String();
      });

      it ( 'should be "15985"' , function () {
        converted.should.be.exactly("15985");
      });

    });

    describe ( '{Symbol} (Symbol())' , function () {

      const converted = Mungo.convert(Symbol(), String);

      it ( 'should be a string', function () {
        converted.should.be.a.String();
      });

      it ( 'should be "Symbol()"' , function () {
        converted.should.be.exactly("Symbol()");
      });
    });

    describe ( '{Function} (Function)' , function () {

      const converted = Mungo.convert(Function, String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be "function Function() { [native code] }"', function () {

        converted.should.be.exactly("function Function() { [native code] }");

      });
    });

    describe ( '{Buffer}' , function () {

      const converted = Mungo.convert(new Buffer('1'), String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be "1"', function () {

        converted.should.be.exactly('1');

      });
    });

    describe ( '{Binary} (0b11)' , function () {

      const converted = Mungo.convert(0b11, String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be "3"', function () {

        converted.should.be.exactly("3");

      });

      describe ( 'base 2 (0b0011)', function () {

        const base2 = Mungo.convert(0b0011, String);

        it ( 'should be a string', function () {

          base2.should.be.a.String();

        });

        it ( 'should be "3"', function () {

          base2.should.be.exactly("3");

        });

      });
    });

    describe ( '{Model}' , function () {

      const converted = Mungo.convert(new (Mungo.Model)(), String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( 'should be "[object Object]"', function () {

        converted.should.be.exactly("[object Object]");

      });

    });

    describe ( '{ObjectID}' , function () {

      const _id = Mungo.ObjectID();

      const converted = Mungo.convert(_id, String);

      it ( 'should be a string', function () {

        converted.should.be.a.String();

      });

      it ( `should be "${_id.toString()}"`, function () {

        converted.should.be.exactly(_id.toString());

      });

    });

    describe ( '{Regex} (/abc/)' , function () {

      const converted = Mungo.convert(/abc/, String);

      it ( 'should be a string', function () {
        converted.should.be.a.String();
      });

      it ( 'should be "/abc/"' , function () {
        converted.should.be.exactly("/abc/");
      });

    });

    describe ( '{Error} (new Error("abc"))' , function () {

      const converted = Mungo.convert(new Error('abc'), String);

      it ( 'should be a string', function () {
        converted.should.be.a.String();
      });

      it ( 'should be "Error: abc"' , function () {
        converted.should.be.exactly("Error: abc");
      });

    });


  });

  describe ( '<Boolean>' , function () {

    describe ( '{Number}' , function () {

      describe ( 'Integer' , function () {

        describe ( 'Positive (123)' , function () {

          const converted = Mungo.convert(123, Boolean);

          it ( 'should be a boolean' , function () {

            converted.should.be.a.Boolean();

          });

          it ( 'should be a true' , function () {

            converted.should.be.exactly(true);

          });

        });

        describe ( 'Zero (0)' , function () {

          const converted = Mungo.convert(0, Boolean);

          it ( 'should be a boolean' , function () {

            converted.should.be.a.Boolean();

          });

          it ( 'should be false' , function () {

            converted.should.be.exactly(false);

          });

        });

        describe ( 'Negative (-123)' , function () {

          const converted = Mungo.convert(-123, Boolean);

          it ( 'should be a boolean' , function () {

            converted.should.be.a.Boolean();

          });

          it ( 'should be true' , function () {

            converted.should.be.exactly(true);

          });

        });

      });

      describe ( 'Float' , function () {

        describe ( 'Positive (1.99)' , function () {

          const converted = Mungo.convert(1.99, Boolean);

          it ( 'should be a boolean' , function () {

            converted.should.be.a.Boolean();

          });

          it ( 'should be true' , function () {

            converted.should.be.exactly(true);

          });

        });

        describe ( 'Negative (-1.99)' , function () {

          const converted = Mungo.convert(-1.99, Boolean);

          it ( 'should be a boolean' , function () {

            converted.should.be.a.Boolean();

          });

          it ( 'should be true' , function () {

            converted.should.be.exactly(true);

          });

        });

      });

      describe ( 'Big number' , function () {

        describe ( 'Big (42e17)' , function () {

          const converted = Mungo.convert(42e17, Boolean);

          it ( 'should be a boolean' , function () {

            converted.should.be.a.Boolean();

          });

          it ( 'should be true' , function () {

            converted.should.be.exactly(true);

          });

        });

        describe ( 'Small (42e-6)' , function () {

          const converted = Mungo.convert(42e-6, Boolean);

          it ( 'should be a boolean' , function () {

            converted.should.be.a.Boolean();

          });

          it ( 'should be true' , function () {

            converted.should.be.exactly(true);

          });

        });

      });

      describe ( 'Precision (1.023616785)' , function () {

        const converted = Mungo.convert(1.023616785, Boolean);

        it ( 'should be a boolean' , function () {

          converted.should.be.a.Boolean();

        });

        it ( 'should be true' , function () {

          converted.should.be.exactly(true);

        });

      });

    });

    describe ( '{String' , function () {

      describe ( 'String ("abc")', function () {

        const converted = Mungo.convert('abc', Boolean);

        it ( 'should be a boolean' , function () {

          converted.should.be.a.Boolean();

        });

        it ( 'should be true' , function () {

          converted.should.be.true;

        });
      });

      describe ( 'Empty string ()', function () {

        const converted = Mungo.convert('', Boolean);

        it ( 'should be a boolean' , function () {

          converted.should.be.a.Boolean();

        });

        it ( 'should be false' , function () {

          converted.should.be.false;

        });
      });


    });

    describe ( '{Boolean}' , function () {

      describe ( 'true', function () {

        const converted = Mungo.convert(true, Boolean);

        it ( 'should be a boolean' , function () {

          converted.should.be.a.Boolean();

        });

        it ( 'should be true' , function () {

          converted.should.be.exactly(true);

        });

      });

      describe ( 'false', function () {

        const converted = Mungo.convert(false, Boolean);

        it ( 'should be a boolean' , function () {

          converted.should.be.a.Boolean();

        });

        it ( 'should be false' , function () {

          converted.should.be.exactly(false);

        });

      });

    });

    describe ( '{Date}' , function () {

      let date = new Date();

      const converted = Mungo.convert(date, Boolean);

      it ( 'should be a boolean' , function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true' , function () {

        converted.should.be.exactly(true);

      });

    });

    describe ( '{null}' , function () {

      const converted = Mungo.convert(null, Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be false' , function () {

        converted.should.be.exactly(false);

      });

    });

    describe ( '{undefined}' , function () {

      const converted = Mungo.convert(undefined, Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be false' , function () {

        converted.should.be.exactly(false);

      });

    });

    describe ( '{Array}' , function () {

      const converted = Mungo.convert([], Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });

    });

    describe ( '{Object}' , function () {

      const converted = Mungo.convert({}, Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });

    });

    describe ( '{Infinity}' , function () {

      describe ( 'Infinity', function () {

        const converted = Mungo.convert(Infinity, Boolean);

        it ( 'should be a boolean', function () {

          converted.should.be.a.Boolean();

        });

        it ( 'should be true', function () {

          converted.should.be.exactly(true);

        });

      });

      describe ( '-Infinity', function () {

        const converted = Mungo.convert(-Infinity, Boolean);

        it ( 'should be a boolean', function () {

          converted.should.be.a.Boolean();

        });

        it ( 'should be true', function () {

          converted.should.be.exactly(true);

        });

      });

    });

    describe ( '{Octal}' , function () {

      const converted = Mungo.convert(0o644, Boolean);

      it ( 'should be a boolean', function () {
        converted.should.be.a.Boolean();
      });

      it ( 'should be true' , function () {
        converted.should.be.exactly(true);
      });

    });

    describe ( '{Decimal} (0x3e71)' , function () {

      const converted = Mungo.convert(0x3e71, Boolean);

      it ( 'should be a boolean', function () {
        converted.should.be.a.Boolean();
      });

      it ( 'should be true' , function () {
        converted.should.be.exactly(true);
      });

    });

    describe ( '{Symbol} (Symbol())' , function () {

      const converted = Mungo.convert(Symbol(), Boolean);

      it ( 'should be a boolean', function () {
        converted.should.be.a.Boolean();
      });

      it ( 'should be true' , function () {
        converted.should.be.exactly(true);
      });
    });

    describe ( '{Function} (Function)' , function () {

      const converted = Mungo.convert(Function, Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });
    });

    describe ( '{Buffer}' , function () {

      const converted = Mungo.convert(new Buffer('1'), Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });
    });

    describe ( '{Binary} (0b11)' , function () {

      const converted = Mungo.convert(0b11, Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });

      describe ( 'base 2 (0b0011)', function () {

        const base2 = Mungo.convert(0b0011, Boolean);

        it ( 'should be a boolean', function () {

          base2.should.be.a.Boolean();

        });

        it ( 'should be true', function () {

          converted.should.be.exactly(true);

        });

      });
    });

    describe ( '{Model}' , function () {

      const converted = Mungo.convert(new (Mungo.Model)(), Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });

    });

    describe ( '{ObjectID}' , function () {

      const _id = Mungo.ObjectID();

      const converted = Mungo.convert(_id, Boolean);

      it ( 'should be a boolean', function () {

        converted.should.be.a.Boolean();

      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });

    });

    describe ( '{Regex} (/abc/)' , function () {

      const converted = Mungo.convert(/abc/, Boolean);

      it ( 'should be a boolean', function () {
        converted.should.be.a.Boolean();
      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });

    });

    describe ( '{Error} (new Error("abc"))' , function () {

      const converted = Mungo.convert(new Error('abc'), Boolean);

      it ( 'should be a boolean', function () {
        converted.should.be.a.Boolean();
      });

      it ( 'should be true', function () {

        converted.should.be.exactly(true);

      });

    });


  });

  describe ( '<Date>' , function () {

    describe ( '{Number}' , function () {

      describe ( 'Integer' , function () {

        describe ( 'Positive (123)' , function () {

          const converted =  Mungo.convert(123, Date);

          it ( `should be a date (${converted})` , function () {

            converted.should.be.a.Date();

          });

        });

        describe ( 'Zero (0)' , function () {

          const converted =  Mungo.convert(0, Date);

          it ( `should be a date (${converted})` , function () {

            converted.should.be.a.Date();

          });

        });

        describe ( 'Negative (-123)' , function () {

          const converted =  Mungo.convert(-123, Date);

          it ( `should be a date (${converted})` , function () {

            converted.should.be.a.Date();

          });

        });

      });

      describe ( 'Float' , function () {

        describe ( 'Positive (1.99)' , function () {

          const converted = Mungo.convert(1.99, Date);

          it ( `should be a date (${converted})` , function () {

            converted.should.be.a.Date();

          });
        });

        describe ( 'Negative (-1.99)' , function () {

          const converted = Mungo.convert(-1.99, Date);

          it ( `should be a date (${converted})` , function () {

            converted.should.be.a.Date();

          });

        });

      });

      describe ( 'Big number' , function () {

        describe ( 'Big (42e17)' , function () {

          const converted = Mungo.convert(42e17, Date);

          it ( `should be not a date (${converted})` , function () {

            converted.should.not.be.a.Date();

          });

        });

        describe ( 'Small (42e-6)' , function () {

          const converted = Mungo.convert(42e-6, Date);

          it ( `should be a date (${converted})` , function () {

            converted.should.be.a.Date();

          });

        });

      });

      describe ( 'Precision (1.023616785)' , function () {

        const converted = Mungo.convert(1.023616785, Date);

        it ( `should be a date (${converted})` , function () {

          converted.should.be.a.Date();

        });

      });

    });

    describe ( '{String' , function () {

      describe ( 'String ("abc")', function () {

        const converted = Mungo.convert('abc', Date);

        it ( `should be not a date (${converted})` , function () {

          converted.should.not.be.a.Date();

        });
      });

      describe ( 'Empty string ()', function () {

        const converted = Mungo.convert('', Date);

        it ( `should be not a date (${converted})` , function () {

          converted.should.not.be.a.Date();

        });
      });

      describe ( `Date format ("${new Date()}")`, function () {

        const converted = Mungo.convert(new Date().toString(), Date);

        it ( `should be a date (${converted})` , function () {

          converted.should.be.a.Date();

        });
      });


    });

    describe ( '{Boolean}' , function () {

      describe ( 'true', function () {

        const converted = Mungo.convert(true, Date);

        it ( `should be a date (${converted})` , function () {

          converted.should.be.a.Date();

        });

      });

      describe ( 'false', function () {

        const converted = Mungo.convert(false, Date);

        it ( `should be a date (${converted})` , function () {

          converted.should.be.a.Date();

        });

      });

    });

    describe ( `{Date} ${new Date()}` , function () {

      let date = new Date();

      const converted = Mungo.convert(date, Date);

      it ( `should be a date (${converted})` , function () {

        converted.should.be.a.Date();

      });

    });

    describe ( '{null}' , function () {

      const converted = Mungo.convert(null, Date);

      it ( `should be a date (${converted})` , function () {

        converted.should.be.a.Date();

      });

    });

    describe ( '{undefined}' , function () {

      const converted = Mungo.convert(undefined, Date);

      it ( `should not be a date (${converted})` , function () {

        converted.should.not.be.a.Date();

      });

    });

    describe ( '{Array}' , function () {

      describe ( 'Date array [2015, 10, 20]' , function () {

        const converted = Mungo.convert([2015, 10, 20], Date);

        it ( `should be a date (${converted})` , function () {

          converted.should.be.a.Date();

        });

      });

      describe ( 'Date array [2015, "January", 20]' , function () {

        const converted = Mungo.convert([2015, "January", 20], Date);

        it ( `should be a date (${converted})` , function () {

          converted.should.be.a.Date();

        });

      });

      describe ( 'Non Date array ["a", "b", "c"]' , function () {

        const converted = Mungo.convert(['a', 'b', 'c'], Date);

        it ( `should not be a date (${converted})` , function () {

          converted.should.not.be.a.Date();

        });

      });

    });

    describe ( '{Object}' , function () {

      const converted = Mungo.convert({}, Date);

      it ( `should not be a date (${converted})` , function () {

        converted.should.not.be.a.Date();

      });

    });

    describe ( '{Infinity}' , function () {

      describe ( 'Infinity', function () {

        const converted = Mungo.convert(Infinity, Date);

        it ( `should not be a date (${converted})` , function () {

          converted.should.not.be.a.Date();

        });

      });

      describe ( '-Infinity', function () {

        const converted = Mungo.convert(-Infinity, Date);

        it ( `should not be a date (${converted})` , function () {

          converted.should.not.be.a.Date();

        });

      });

    });

    describe ( '{Octal}' , function () {

      const converted = Mungo.convert(0o644, Date);

      it ( `should be a date (${converted})` , function () {

        converted.should.be.a.Date();

      });

    });

    // describe ( '{Decimal} (0x3e71)' , function () {
    //
    //   const converted = Mungo.convert(0x3e71, Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //     converted.should.be.a.Boolean();
    //   });
    //
    //   it ( 'should be true' , function () {
    //     converted.should.be.exactly(true);
    //   });
    //
    // });
    //
    // describe ( '{Symbol} (Symbol())' , function () {
    //
    //   const converted = Mungo.convert(Symbol(), Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //     converted.should.be.a.Boolean();
    //   });
    //
    //   it ( 'should be true' , function () {
    //     converted.should.be.exactly(true);
    //   });
    // });
    //
    // describe ( '{Function} (Function)' , function () {
    //
    //   const converted = Mungo.convert(Function, Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //
    //     converted.should.be.a.Boolean();
    //
    //   });
    //
    //   it ( 'should be true', function () {
    //
    //     converted.should.be.exactly(true);
    //
    //   });
    // });
    //
    // describe ( '{Buffer}' , function () {
    //
    //   const converted = Mungo.convert(new Buffer('1'), Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //
    //     converted.should.be.a.Boolean();
    //
    //   });
    //
    //   it ( 'should be true', function () {
    //
    //     converted.should.be.exactly(true);
    //
    //   });
    // });
    //
    // describe ( '{Binary} (0b11)' , function () {
    //
    //   const converted = Mungo.convert(0b11, Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //
    //     converted.should.be.a.Boolean();
    //
    //   });
    //
    //   it ( 'should be true', function () {
    //
    //     converted.should.be.exactly(true);
    //
    //   });
    //
    //   describe ( 'base 2 (0b0011)', function () {
    //
    //     const base2 = Mungo.convert(0b0011, Boolean);
    //
    //     it ( 'should be a boolean', function () {
    //
    //       base2.should.be.a.Boolean();
    //
    //     });
    //
    //     it ( 'should be true', function () {
    //
    //       converted.should.be.exactly(true);
    //
    //     });
    //
    //   });
    // });
    //
    // describe ( '{Model}' , function () {
    //
    //   const converted = Mungo.convert(new (Mungo.Model)(), Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //
    //     converted.should.be.a.Boolean();
    //
    //   });
    //
    //   it ( 'should be true', function () {
    //
    //     converted.should.be.exactly(true);
    //
    //   });
    //
    // });
    //
    // describe ( '{ObjectID}' , function () {
    //
    //   const _id = Mungo.ObjectID();
    //
    //   const converted = Mungo.convert(_id, Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //
    //     converted.should.be.a.Boolean();
    //
    //   });
    //
    //   it ( 'should be true', function () {
    //
    //     converted.should.be.exactly(true);
    //
    //   });
    //
    // });
    //
    // describe ( '{Regex} (/abc/)' , function () {
    //
    //   const converted = Mungo.convert(/abc/, Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //     converted.should.be.a.Boolean();
    //   });
    //
    //   it ( 'should be true', function () {
    //
    //     converted.should.be.exactly(true);
    //
    //   });
    //
    // });
    //
    // describe ( '{Error} (new Error("abc"))' , function () {
    //
    //   const converted = Mungo.convert(new Error('abc'), Boolean);
    //
    //   it ( 'should be a boolean', function () {
    //     converted.should.be.a.Boolean();
    //   });
    //
    //   it ( 'should be true', function () {
    //
    //     converted.should.be.exactly(true);
    //
    //   });
    //
    // });
    //

  });

});
