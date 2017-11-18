'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = flatten;
var isNumber = function isNumber(value) {
  return !isNaN(Number(value));
};

function flatten(input, reference, output) {
  var output = output || [];
  var reference = reference || '';

  Object.keys(input).forEach(function (key) {
    var value = input[key];

    if (key) {
      var slash = reference ? '/' : '';
      var keyPart = isNumber(key) ? '' : slash + key;
      key = reference + keyPart;
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
      flatten(value, key, output);
    } else {
      output.push('' + (key.length ? key + '/' : '') + value);
    }
  });

  return output;
}
module.exports = exports['default'];