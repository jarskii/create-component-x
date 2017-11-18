import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import Enquirer from 'enquirer';
import config from '../storage/config.json';
import getDirFilesSync from './helpers/getDirFilesSync';

const enquirer = new Enquirer();

export default async function({name, pat}) {
  if (!name) {
    enquirer.question('templateName', 'What are name of template?');
    const ask = await enquirer.ask();
    name = ask.templateName;
  }

  fs.readFile(config.storagePath, function(err, data) {
    if (err) {
      console.error(err);
    }

    const storage = JSON.parse(data);
    const currentPath = process.cwd();

    storage.list[name] = {
      path: currentPath,
      pat: pat,
      files: getDirFilesSync(currentPath)
    };

    fs.writeFile(config.storagePath, JSON.stringify(storage), 'utf8', function(err) {
      if (err) {
        console.error(err);
      } else {
        console.info('Template added successfully!')
      }
    });
  });
};


