'use strict';

var List = require('prompt-list');
var config = require('../storage/config.json');
var createComponent = require('./createComponent.js');

module.exports = function (_ref) {
  var name = _ref.name;

  console.info('Create component...');
  var listOfTemplates = require(config.storagePath).list;

  var list = new List({
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
};