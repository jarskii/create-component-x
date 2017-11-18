'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var template = _ref.template,
      componentName = _ref.componentName;

  var listOfTemplates = require(_config2.default.storagePath).list;
  var templateData = listOfTemplates[template];
  var files = templateData.files;
  var sourcePath = templateData.path;
  var compNamePattern = new RegExp((0, _lodash2.default)(templateData.pat), 'g') || COMP_NAME_PAT;
  var newComponentPath = _path2.default.join(process.cwd(), componentName);

  (0, _createFolder2.default)(newComponentPath);

  var preparedFiles = (0, _flatten2.default)(files);

  preparedFiles.forEach(function (file) {
    var filePathParts = file.split('/');
    var reference = [];

    if (filePathParts.length > 1) {
      var folders = filePathParts.slice(0, filePathParts.length - 1);

      folders.forEach(function (folder) {

        reference.push(folder);

        var currentFolderPath = _path2.default.join(newComponentPath, reference.join('/'));

        if (!_fs2.default.existsSync(currentFolderPath)) {
          (0, _createFolder2.default)(currentFolderPath);
        }
      });
    }

    var fileName = filePathParts[filePathParts.length - 1];

    rewriteFileName({
      sourcePath: _path2.default.join(sourcePath, reference.join('/'), fileName),
      newComponentPath: _path2.default.join(newComponentPath, reference.join('/'), fileName),
      componentName: componentName,
      compNamePattern: compNamePattern
    });
  });

  console.info('Success! Path: ', newComponentPath);
};

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash.escaperegexp');

var _lodash2 = _interopRequireDefault(_lodash);

var _createFolder = require('./helpers/createFolder');

var _createFolder2 = _interopRequireDefault(_createFolder);

var _flatten = require('./helpers/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _config = require('../storage/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMP_NAME_PAT = /\$compName\$/g;

;

function rewriteFileName(_ref2) {
  var sourcePath = _ref2.sourcePath,
      newComponentPath = _ref2.newComponentPath,
      componentName = _ref2.componentName,
      compNamePattern = _ref2.compNamePattern;

  var blueprintContent = _fs2.default.readFileSync(_path2.default.resolve(sourcePath), 'utf8');

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

  _fs2.default.writeFileSync(newComponentPath.replace(compNamePattern, componentName), content, 'utf8');
}
module.exports = exports['default'];