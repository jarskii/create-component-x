var fs = require('fs');
var path = require('path');
var config = require('../storage/config.json');
var escapeRegExp = require('lodash.escaperegexp');
var COMP_NAME_PAT = /\$compName\$/g;

module.exports = function({template, componentName}) {
  var listOfTemplates = require(config.storagePath).list;
  var templateData = listOfTemplates[template];
  var files = templateData.files;
  var sourcePath = templateData.path;
  var compNamePattern = new RegExp(escapeRegExp(templateData.pat), 'g') || COMP_NAME_PAT;
  var newComponentPath = path.join(process.cwd(), componentName);

  createFolder(newComponentPath);

  files.forEach(function recursionFolder(fileName) {
    if (typeof fileName === 'string') {
      rewriteFileName({
        sourcePath: path.join(sourcePath, fileName),
        newComponentPath: path.join(newComponentPath, fileName),
        componentName,
        compNamePattern
      });
    } else if (typeof fileName === 'object') {
      Object.keys(fileName).forEach(function(folder) {
        var currentFolderPath = path.join(newComponentPath, folder);
        createFolder(currentFolderPath);

        fileName[folder].forEach(function(file) {
          rewriteFileName({
            sourcePath: path.join(sourcePath, file),
            newComponentPath: path.join(currentFolderPath, file),
            componentName,
            compNamePattern
          });
        });
      });
    }
  });
};

function rewriteFileName({sourcePath, newComponentPath, componentName, compNamePattern}) {
  var blueprintContent = fs.readFileSync(path.resolve(sourcePath), 'utf8');

  rewriteFileContent({
    content: blueprintContent,
    newComponentPath,
    componentName,
    compNamePattern
  })
}

function rewriteFileContent({content, newComponentPath, componentName, compNamePattern}) {
  console.log(compNamePattern);
  content = content.replace(compNamePattern, componentName);

  fs.writeFileSync(newComponentPath.replace(compNamePattern, componentName), content, 'utf8');
}

function createFolder(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  } else {
    throw new Error('Folder already exist!');
  }
}