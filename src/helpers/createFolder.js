import fs from 'fs';

export default function createFolder(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    return Promise.resolve();
  }

  return Promise.reject();
}
