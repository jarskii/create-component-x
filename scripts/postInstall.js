const fs = require('fs');
const path = require('path');
const createFolder = require('../src/helpers/createFolder');

const CONFIG_PATH = path.resolve('storage', 'config.json');
const HOME_DIR_PATH = require('os').homedir();
const CREATE_COMPONENT_SYS_PATH = path.join(HOME_DIR_PATH, '.createComponent');
const STORAGE_PATH = path.join(CREATE_COMPONENT_SYS_PATH, 'storage.json');

fs.readFile(CONFIG_PATH, function(err, data) {
  if (err) {
    console.error(err);
    return;
  }

  var config = JSON.parse(data);

  config.storagePath = STORAGE_PATH;

  createFolder(CREATE_COMPONENT_SYS_PATH).then(() => {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config), 'utf8');
    fs.writeFileSync(STORAGE_PATH, JSON.stringify({list: {}}), 'utf8');
  }).catch(() => {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config), 'utf8');
    console.info('Good! Config aready exist');
  });
});
