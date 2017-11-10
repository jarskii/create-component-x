var fs = require('fs');
var path = require('path');

var STORAGE_FOLDER_PATH = path.resolve('storage');
var CONFIG_PATH = path.resolve('storage', 'config.json');

fs.readFile(CONFIG_PATH, function(err, data) {
  if (err) {
    console.error(err);
  }

  var config = JSON.parse(data);
  var STORAGE_PATH = path.join(STORAGE_FOLDER_PATH, 'storage.json')

  config.storagePath = STORAGE_PATH;

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config), 'utf8');
  fs.writeFileSync(STORAGE_PATH, JSON.stringify({list: {}}), 'utf8');
});
