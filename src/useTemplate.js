require('babel-polyfill');
var fs = require('fs');
var path = require('path');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();
var config = require('../storage/config.json');

module.exports = async function({name, pat}) {
  if (!name) {
    enquirer.question('templateName', 'What are name of template?');
    var ask = await enquirer.ask();
    name = ask.templateName;
  }

  fs.readFile(config.storagePath, function(err, data) {
    if (err) {
      console.error(err);
    }

    var storage = JSON.parse(data);
    var currentPath = process.cwd();

    storage.list[name] = {
      path: currentPath,
      pat: pat,
      files: allFilesSync(currentPath)
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

function allFilesSync(dir, fileList) {

  if (!fileList) {
    fileList = [];
  }

  fs.readdirSync(dir).forEach(function(file) {
    const filePath = path.join(dir, file)

    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? {[file]: allFilesSync(filePath)}
        : file
    )
  });
  return fileList
}
