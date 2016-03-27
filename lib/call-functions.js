module.exports = function callIfFunction(maybeFunction) {
  if (typeof maybeFunction === "function") {
    return maybeFunction();
  }

  return maybeFunction;
}
