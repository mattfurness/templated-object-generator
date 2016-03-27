"use strict"

var traversingFunctions = {
  '[object Array]': traverseArray,
  '[object Object]': traverseObject
}

var typesToSkipVisiting = Object.getOwnPropertyNames(traversingFunctions);
var toTypeString =  Object.prototype.toString;

function getObjectKeys(obj) {
  return Object.getOwnPropertySymbols(obj).concat(Object.getOwnPropertyNames(obj));
}

function shouldVisit(propValue) {
  return typesToSkipVisiting.indexOf(toTypeString.call(propValue)) < 0;
}

function traverseObject(objectTree, onVisit) {
  var propertyKeys = getObjectKeys(objectTree);

  return propertyKeys.reduce(function(transformedObject, key){
    transformedObject[key] = traverse(objectTree[key], onVisit);
    return transformedObject;
  }, {});
}

function traverseArray(objectTree, onVisit) {
  return objectTree.map(function traverseArrayElements(element){
    return traverse(element, onVisit);
  });
}

function visitPropertyValue(propValue, onVisit) {
  var valueToVisit = propValue;
  if (toTypeString.call(propValue) === '[object Date]') {
    valueToVisit = new Date(propValue);
  }
  return onVisit(objectTree, onVisit);
}

function traverse(objectTree, onVisit) {
  if (shouldVisit(objectTree)) {
    return onVisit(objectTree);
  }

  var traverseType = toTypeString.call(objectTree);

  return traversingFunctions[traverseType](objectTree, onVisit);
};

module.exports = traverse;
