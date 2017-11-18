import fs from 'fs';
import path from 'path';

export default function getDirFilesSync(dir, fileList) {
  if (!fileList) {
    fileList = [];
  }

  fs.readdirSync(dir).forEach(function(file) {
    const filePath = path.join(dir, file)

    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? {[file]: getDirFilesSync(filePath)}
        : file
    )
  });
  return fileList
}