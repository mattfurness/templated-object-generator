# Templated Object Generator

## Overview

Use an object as a template to generate any number of objects matching the template. It will walk the object tree and call any property value that is a function. It is quite useful when used in conjunction with the excellent [Chance](http://chancejs.com) library.

Notes:
* Symbols can be used as object keys.
* Each element in an array provided in a template will be "visited".

## Installation

```sh
npm install templated-object-generator
```

## Example Usage

The example below generates 2 objects. These object will have an incrementing name and a random rating for each review in the reviews array.

Note: This example is available under the examples folder.

```js
"use strict"
var generateObjects = require('templated-object-generator');

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
```

Example Output:
```js
[
  {
    "title": "name 1",
    "reviews": [
      {
        "userName": "foo",
        "rating": 71
      },
      {
        "userName": "bar",
        "rating": 70
      }
    ]
  },
  {
    "title": "name 2",
    "reviews": [
      {
        "userName": "foo",
        "rating": 58
      },
      {
        "userName": "bar",
        "rating": 60
      }
    ]
  }
]
```
