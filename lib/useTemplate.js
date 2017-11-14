'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');
var fs = require('fs');
var path = require('path');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();
var config = require('../storage/config.json');

module.exports = function () {
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

            fs.readFile(config.storagePath, function (err, data) {
              if (err) {
                console.error(err);
              }

              var storage = JSON.parse(data);
              var currentPath = process.cwd();

              storage.list[name] = {
                path: currentPath,
                pat: pat,
                files: allFilesSync(currentPath)
              };

              fs.writeFile(config.storagePath, JSON.stringify(storage), 'utf8', function (err) {
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

function allFilesSync(dir, fileList) {

  if (!fileList) {
    fileList = [];
  }

  fs.readdirSync(dir).forEach(function (file) {
    var filePath = path.join(dir, file);

    fileList.push(fs.statSync(filePath).isDirectory() ? _defineProperty({}, file, allFilesSync(filePath)) : file);
  });
  return fileList;
}