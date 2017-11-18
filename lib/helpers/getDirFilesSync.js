'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDirFilesSync;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDirFilesSync(dir, fileList) {
  if (!fileList) {
    fileList = [];
  }

  _fs2.default.readdirSync(dir).forEach(function (file) {
    var filePath = _path2.default.join(dir, file);

    fileList.push(_fs2.default.statSync(filePath).isDirectory() ? _defineProperty({}, file, getDirFilesSync(filePath)) : file);
  });
  return fileList;
}
module.exports = exports['default'];