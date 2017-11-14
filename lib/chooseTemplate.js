'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var List = require('prompt-list');
var config = require('../storage/config.json');
var createComponent = require('./createComponent.js');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

module.exports = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var name = _ref2.name;
    var ask, listOfTemplates, list;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.info('Create component...');

            if (name) {
              _context.next = 7;
              break;
            }

            enquirer.question('componentName', 'What are name of component?');
            _context.next = 5;
            return enquirer.ask();

          case 5:
            ask = _context.sent;

            name = ask.componentName;

          case 7:
            listOfTemplates = require(config.storagePath).list;
            list = new List({
              name: 'Templates',
              message: 'Choose type of template:',
              choices: Object.keys(listOfTemplates)
            });


            list.ask(function (answer) {
              createComponent({
                template: answer,
                componentName: name
              });
            });

          case 10:
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