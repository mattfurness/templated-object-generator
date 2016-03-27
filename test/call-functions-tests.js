"use strict";
var test = require('tape');
var callIfFunction = require('../lib/call-functions.js');

function returnValue(value) {
  return value;
}

test('return value of function param is returned', function (assert) {
  assert.equal(callIfFunction(() => 5), 5);
  assert.end();
});

test('value is simply returned', function (assert) {
  assert.equal(callIfFunction(5), 5);
  assert.end();
});
