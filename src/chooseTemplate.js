import 'babel-polyfill';

import Enquirer from 'enquirer';
import List from 'prompt-list';

import config from '../storage/config.json';
import createComponent from './createComponent.js';

const enquirer = new Enquirer();

export default async function({ name }) {
  console.info('Create component...');

  if (!name) {
    enquirer.question('componentName', 'What is the name of the component?');
    const ask = await enquirer.ask();
    name = ask.componentName;
  }

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
}
