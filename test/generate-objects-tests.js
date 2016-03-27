"use strict";
var test = require('tape');
var generateObjects = require('../lib/generate-objects.js');

function numberGeneratorFactory() {
  var value = 1;

  return function incrementNumber() {
    return value++;
  }
}

test('objects are generated', function (assert) {
  var numberGenerator = numberGeneratorFactory();
  var template = {
    nested: {
      someNumber: numberGenerator,
    }
  };
  var testObjects = [{
    nested: {
      someNumber: 1,
    }
  },
  {
    nested: {
      someNumber: 2,
    }
  }];

  assert.deepEqual(generateObjects(template, 2), testObjects);
  assert.end();
});
