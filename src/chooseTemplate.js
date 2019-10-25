require('babel-polyfill');
var List = require('prompt-list');
var config = require('../storage/config.json');
var createComponent = require('./createComponent.js');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

export default async function({name}) {
  console.info('Create component...');

  if (!name) {
    enquirer.question('componentName', 'What is the name of the component?');
    const ask = await enquirer.ask();
    name = ask.componentName;
  }

  console.log(config);

  var listOfTemplates = require(config.storagePath).list;

  if (!Object.keys(listOfTemplates).length) {
    console.error(`Your list of blueprints is empty. Use "c-c use" to add a blueprint to the list`);
  }

  var list = new List({
    name: 'Templates',
    message: 'Choose a blueprint:',
    choices: Object.keys(listOfTemplates)
  });

  list.ask(function(answer) {
    createComponent({
      template: answer,
      componentName: name
    })
  });
};
