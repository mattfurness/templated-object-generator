"use strict"
var generateObjects = require('../lib/generate-objects.js');

function randomNumberGenerator() {
  return Math.floor(Math.random() * 100);
}

var incrementName = (function incrementNameFactory() {
  var counter = 1;

  return function incrementName() {
    return 'name ' + counter++;
  }
}());

var template = {
  title: incrementName,
  reviews: [
    {
      userName: 'foo',
      rating: randomNumberGenerator
    },
    {
      userName: 'bar',
      rating: randomNumberGenerator
    }
  ]
}

var generated = generateObjects(template, 2);

console.log(JSON.stringify(generated));
