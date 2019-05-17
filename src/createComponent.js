import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import escapeRegExp from 'lodash.escaperegexp';
import createFolder from './helpers/createFolder';
import flatten from './helpers/flatten';

import config from '../storage/config.json';

const COMP_NAME_PAT = /\$compName\$/g;

export default function({template, componentName}) {
  const listOfTemplates = require(config.storagePath).list;
  const templateData = listOfTemplates[template];
  const files = templateData.files;
  const sourcePath = templateData.path;
  const compNamePattern = new RegExp(escapeRegExp(templateData.pat), 'g') || COMP_NAME_PAT;
  const newComponentPath = path.join(process.cwd(), componentName);

  createFolder(newComponentPath);

  const preparedFiles = flatten(files);


  preparedFiles.forEach(function(file) {
    const filePathParts = file.split('/');
    const reference = [];

    if (filePathParts.length > 1) {
      const folders = filePathParts.slice(0, filePathParts.length - 1);

      folders.forEach(function(folder) {

        reference.push(folder);

        let currentFolderPath = path.join(newComponentPath, reference.join('/'));

        if (!fs.existsSync(currentFolderPath)) {
          createFolder(currentFolderPath);
        }
      });
    }

    var fileName = filePathParts[filePathParts.length - 1];

    rewriteFileName({
      sourcePath: path.join(sourcePath, reference.join('/'), fileName),
      newComponentPath: path.join(newComponentPath, reference.join('/'), fileName),
      componentName,
      compNamePattern
    });

  });
};

function rewriteFileName({sourcePath, newComponentPath, componentName, compNamePattern}) {
  try {
    const blueprintContent = fs.readFileSync(path.resolve(sourcePath), 'utf8');

    rewriteFileContent({
      content: blueprintContent,
      newComponentPath,
      componentName,
      compNamePattern
    })
  } catch(e) {
    console.error(sourcePath, ' - file was deleted');
  }
}

function rewriteFileContent({content, newComponentPath, componentName, compNamePattern}) {
  content = content.replace(compNamePattern, componentName);

  fs.writeFileSync(newComponentPath.replace(compNamePattern, componentName), content, 'utf8');
}

