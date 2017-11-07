var fs = require('fs');
var path = require('path');

var STORAGE_PATH = path.resolve('storage', 'storage.json');
var CONFIG_PATH = path.resolve('storage', 'config.json');

fs.readFile(CONFIG_PATH, function(err, data) {
  if (err) {
    console.error(err);
  }

  var config = JSON.parse(data);

  config.storagePath = STORAGE_PATH;

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config), 'utf8');
});
