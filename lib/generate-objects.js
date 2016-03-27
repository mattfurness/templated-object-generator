var traverse = require('./traverse');
var callIfFunction = require('./call-functions');

function generateSingleObject(template){
  return traverse(template, callIfFunction)
}

module.exports = function generateObjects(template, numberToGenerate){
  return Array.apply(null, Array(numberToGenerate))
              .map(generateSingleObject.bind(null, template));
}
