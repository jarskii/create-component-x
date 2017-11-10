var fs = require('fs');
var path = require('path');
var config = require('../storage/config.json');
var escapeRegExp = require('lodash.escaperegexp');
var COMP_NAME_PAT = /\$compName\$/g;

const isNumber =  (value) => !isNaN(Number(value));

function flatten(input, reference, output) {
  var output = output || [];
  var reference = reference || '';

  Object.keys(input).forEach(function(key) {
    var value = input[key];

    if (key) {
      let slash = reference ? '/' : '';
      let keyPart = isNumber(key) ? '' : slash + key
      key = reference  + keyPart;
    }

    if (typeof value === 'object' && value !== null) {
      flatten(value, key, output);
    } else {
      output.push(`${key.length ? ( key + '/' ) : '' }${value}`);
    }
  });

  return output;
}

module.exports = function({template, componentName}) {
  var listOfTemplates = require(config.storagePath).list;
  var templateData = listOfTemplates[template];
  var files = templateData.files;
  var sourcePath = templateData.path;
  var compNamePattern = new RegExp(escapeRegExp(templateData.pat), 'g') || COMP_NAME_PAT;
  var newComponentPath = path.join(process.cwd(), componentName);

  createFolder(newComponentPath);

  var preparedFiles = flatten(files);

  console.log(preparedFiles)

  preparedFiles.forEach(function(file) {
    var filePathParts = file.split('/');
    var reference = [];

    if (filePathParts.length > 1) {
      var folders = filePathParts.slice(0, filePathParts.length - 1);

      folders.forEach(function(folder) {

        reference.push(folder);

        let currentFolderPath = path.join(newComponentPath, reference.join('/'));

        console.log('currentFolderPath: ', currentFolderPath);

        if (!fs.existsSync(currentFolderPath)) {
          createFolder(currentFolderPath);
        }
      });
    }

    var fileName = filePathParts[filePathParts.length - 1]

    rewriteFileName({
      sourcePath: path.join(sourcePath, reference.join('/'), fileName),
      newComponentPath: path.join(newComponentPath, reference.join('/'), fileName),
      componentName,
      compNamePattern
    });

  });

  //preparedFiles.forEach(function recursionFolder(fileName) {
  //  if (typeof fileName === 'string') {
  //    rewriteFileName({
  //      sourcePath: path.join(sourcePath, fileName),
  //      newComponentPath: path.join(newComponentPath, fileName),
  //      componentName,
  //      compNamePattern
  //    });
  //  } else if (typeof fileName === 'object') {
  //    Object.keys(fileName).forEach(function(folder) {
  //      var currentFolderPath = path.join(newComponentPath, folder);
  //      createFolder(currentFolderPath);
  //
  //      fileName[folder].forEach(function(file) {
  //        //rewriteFileName({
  //        //  sourcePath: path.join(sourcePath, folder, file),
  //        //  newComponentPath: path.join(currentFolderPath, file),
  //        //  componentName,
  //        //  compNamePattern
  //        //});
  //        recursionFolder(typeof file === 'object' ? file : path.join(folder, file))
  //      });
  //    });
  //  }
  //});
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