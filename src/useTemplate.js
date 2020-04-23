import '@babel/polyfill';
import fs from 'fs';
import { prompt } from 'enquirer';
import config from '../storage/config.json';
import getDirFilesSync from './helpers/getDirFilesSync';

export default async function({name, pat}) {
  let blueprintName = name;

  if (!blueprintName) {
    const answer = await prompt({
      type: 'input',
      name: 'templateName',
      message: 'What is the name of the blueprint?'
    });

    // eslint-disable-next-line require-atomic-updates
    blueprintName = answer.templateName;
  }

  fs.readFile(config.storagePath, function(err, data) {
    if (err) {
      console.error(err);
    }

    const storage = JSON.parse(data);
    const currentPath = process.cwd();

    storage.list[blueprintName] = {
      path: currentPath,
      pat: pat,
      files: getDirFilesSync(currentPath)
    };

    fs.writeFile(config.storagePath, JSON.stringify(storage), 'utf8', function(err) {
      if (err) {
        console.error(err);
      } else {
        console.info('Blueprint added successfully!')
      }
    });
  });
}


