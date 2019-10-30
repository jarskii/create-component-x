import 'babel-polyfill';

import { prompt, Select } from 'enquirer';

import config from '../storage/config.json';
import createComponent from './createComponent.js';

const listOfTemplates = require(config.storagePath).list;

if (!Object.keys(listOfTemplates).length) {
  console.error(`Your list of blueprints is empty. Use "c-c use" to add a blueprint to the list`);
}

export default async function({ name }) {
  console.info('Create component...');

  let componentName = name;

  if (!componentName) {
    const answer = await prompt({
      type: 'input',
      name: 'componentName',
      message: 'What is the name of the component?'
    });

    // eslint-disable-next-line require-atomic-updates
    componentName = answer.componentName;
  }

  const templatesPrompt = new Select({
    name: 'Templates',
    message: 'Choose a blueprint:',
    choices: Object.keys(listOfTemplates)
  });

  const template = await templatesPrompt.run();

  createComponent({
    template,
    componentName
  });
}
