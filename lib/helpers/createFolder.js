'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFolder;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFolder(dir) {
  if (!_fs2.default.existsSync(dir)) {
    _fs2.default.mkdirSync(dir);
    return Promise.resolve();
  }

  return Promise.reject();
}
module.exports = exports['default'];