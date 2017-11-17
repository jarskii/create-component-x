var fs = require('fs');
var path = require('path');
var createFolder = require('../lib/helpers/createFolder');

var CONFIG_PATH = path.resolve('storage', 'config.json');
var HOME_DIR_PATH = require('os').homedir()
var CREATE_COMPONENT_SYS_PATH = path.join(HOME_DIR_PATH, '.createComponent');
var STORAGE_PATH = path.join(CREATE_COMPONENT_SYS_PATH, 'storage.json');

fs.readFile(CONFIG_PATH, function(err, data) {
  if (err) {
    console.error(err);
  }

  createFolder(CREATE_COMPONENT_SYS_PATH).then((folder) => {
    var config = JSON.parse(data);

    config.storagePath = STORAGE_PATH;

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config), 'utf8');
    fs.writeFileSync(STORAGE_PATH, JSON.stringify({list: {}}), 'utf8');
  }).catch(() => {
    console.info('Good! Config aready exist');
  });
});
