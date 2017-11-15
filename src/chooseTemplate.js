require('babel-polyfill');
var List = require('prompt-list');
var config = require('../storage/config.json');
var createComponent = require('./createComponent.js');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

module.exports = async function({name}) {
  console.info('Create component...');

  if (!name) {
    enquirer.question('componentName', 'What are name of component?');
    var ask = await enquirer.ask();
    name = ask.componentName;
  }

  var listOfTemplates = require(config.storagePath).list;

  if (!listOfTemplates.length) {
    console.error(`You list of templates is empty. Use "c-c use" to add blueprint in list of templates`);
  }

  var list = new List({
    name: 'Templates',
    message: 'Choose type of template:',
    choices: Object.keys(listOfTemplates)
  });

  list.ask(function(answer) {
    createComponent({
      template: answer,
      componentName: name
    })
  });
};