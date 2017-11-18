'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _enquirer = require('enquirer');

var _enquirer2 = _interopRequireDefault(_enquirer);

var _config = require('../storage/config.json');

var _config2 = _interopRequireDefault(_config);

var _getDirFilesSync = require('./helpers/getDirFilesSync');

var _getDirFilesSync2 = _interopRequireDefault(_getDirFilesSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var enquirer = new _enquirer2.default();

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var name = _ref2.name,
        pat = _ref2.pat;
    var ask;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (name) {
              _context.next = 6;
              break;
            }

            enquirer.question('templateName', 'What are name of template?');
            _context.next = 4;
            return enquirer.ask();

          case 4:
            ask = _context.sent;

            name = ask.templateName;

          case 6:

            _fs2.default.readFile(_config2.default.storagePath, function (err, data) {
              if (err) {
                console.error(err);
              }

              var storage = JSON.parse(data);
              var currentPath = process.cwd();

              storage.list[name] = {
                path: currentPath,
                pat: pat,
                files: (0, _getDirFilesSync2.default)(currentPath)
              };

              _fs2.default.writeFile(_config2.default.storagePath, JSON.stringify(storage), 'utf8', function (err) {
                if (err) {
                  console.error(err);
                } else {
                  console.info('Template added successfully!');
                }
              });
            });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exports['default'];