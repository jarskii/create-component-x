'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require('fs');
var path = require('path');
var config = require('../storage/config.json');
var escapeRegExp = require('lodash.escaperegexp');
var COMP_NAME_PAT = /\$compName\$/g;

var isNumber = function isNumber(value) {
  return !isNaN(Number(value));
};

function flatten(input, reference, output) {
  var output = output || [];
  var reference = reference || '';

  Object.keys(input).forEach(function (key) {
    var value = input[key];

    if (key) {
      var slash = reference ? '/' : '';
      var keyPart = isNumber(key) ? '' : slash + key;
      key = reference + keyPart;
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
      flatten(value, key, output);
    } else {
      output.push('' + (key.length ? key + '/' : '') + value);
    }
  });

  return output;
}

module.exports = function (_ref) {
  var template = _ref.template,
      componentName = _ref.componentName;

  var listOfTemplates = require(config.storagePath).list;
  var templateData = listOfTemplates[template];
  var files = templateData.files;
  var sourcePath = templateData.path;
  var compNamePattern = new RegExp(escapeRegExp(templateData.pat), 'g') || COMP_NAME_PAT;
  var newComponentPath = path.join(process.cwd(), componentName);

  createFolder(newComponentPath);

  var preparedFiles = flatten(files);

  preparedFiles.forEach(function (file) {
    var filePathParts = file.split('/');
    var reference = [];

    if (filePathParts.length > 1) {
      var folders = filePathParts.slice(0, filePathParts.length - 1);

      folders.forEach(function (folder) {

        reference.push(folder);

        var currentFolderPath = path.join(newComponentPath, reference.join('/'));

        if (!fs.existsSync(currentFolderPath)) {
          createFolder(currentFolderPath);
        }
      });
    }

    var fileName = filePathParts[filePathParts.length - 1];

    rewriteFileName({
      sourcePath: path.join(sourcePath, reference.join('/'), fileName),
      newComponentPath: path.join(newComponentPath, reference.join('/'), fileName),
      componentName: componentName,
      compNamePattern: compNamePattern
    });
  });
};

function rewriteFileName(_ref2) {
  var sourcePath = _ref2.sourcePath,
      newComponentPath = _ref2.newComponentPath,
      componentName = _ref2.componentName,
      compNamePattern = _ref2.compNamePattern;

  var blueprintContent = fs.readFileSync(path.resolve(sourcePath), 'utf8');

  rewriteFileContent({
    content: blueprintContent,
    newComponentPath: newComponentPath,
    componentName: componentName,
    compNamePattern: compNamePattern
  });
}

function rewriteFileContent(_ref3) {
  var content = _ref3.content,
      newComponentPath = _ref3.newComponentPath,
      componentName = _ref3.componentName,
      compNamePattern = _ref3.compNamePattern;

  content = content.replace(compNamePattern, componentName);

  fs.writeFileSync(newComponentPath.replace(compNamePattern, componentName), content, 'utf8');
}

function createFolder(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    throw new Error('Folder already exist!');
  }
}