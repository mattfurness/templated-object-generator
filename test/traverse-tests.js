"use strict";
var test = require('tape');
var traverse = require('../lib/traverse.js');

function returnValue(value) {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  if (value.toUTCString) {
    return value.toUTCString();
  }

  return value.toString();
}

test('values in nested object are visited', function (assert) {
  var date = new Date(Date.UTC(2016, 3, 27));
  var template = {
    nested: {
      someNumber: 5,
      someBool: true,
      someDate: date,
      someFunc: () => true,
      someString: 'test',
      someSymbol: Symbol(),
      someNull: null,
      someUndefined: undefined
    }
  };
  var testObject = {
    nested: {
      someNumber: '5',
      someBool: 'true',
      someDate: 'Wed, 27 Apr 2016 00:00:00 GMT',
      someFunc: '() => true',
      someString: 'test',
      someSymbol: 'Symbol()',
      someNull: 'null',
      someUndefined: 'undefined'
    }
  };

  var traversed = traverse(template, returnValue);

  assert.deepEqual(traversed, testObject);
  assert.end();
});

test('values in nested array are visited', function (assert) {
  var date = new Date(Date.UTC(2016, 3, 27));
  var template = {
    nested: [5, true, date, () => true, 'test', Symbol(), null, undefined]
  };
  var testObjects = {
    nested: ['5', 'true', 'Wed, 27 Apr 2016 00:00:00 GMT', '() => true', 'test', 'Symbol()', 'null', 'undefined']
  }

  var traversed = traverse(template, returnValue);

  assert.deepEqual(traversed, testObjects);
  assert.end();
});

test('values in constructed object are visited', function (assert) {
  function SomeConstructor() { this.someNumber = 5 };
  var template = {
    nested: new SomeConstructor()
  };
  var testObject = {
    nested: {
      someNumber: '5'
    }
  };

  var traversed = traverse(template, returnValue);

  assert.deepEqual(traversed, testObject);
  assert.end();
});
