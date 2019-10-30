import path from 'path';
import flatten from '../flatten.js';
import getDirFilesSync from '../getDirFilesSync';

import dirStructureMock from '../__mock__/dirStructure';

const rootDir = path.resolve();
const directoryForTesing = path.join(rootDir, 'src', 'helpers', '__mock__', 'dirForTesting');

test('Testing getDirFilesSync func', () => {
  const structure = getDirFilesSync(directoryForTesing);

  expect(structure[0]).toBe(dirStructureMock[0])
  expect(Object.keys(structure[1])[0]).toBe(Object.keys(dirStructureMock[1])[0])
});

test('Tesing flatten func', () => {
  const flattenStructure = flatten(dirStructureMock);
  const folderName = Object.keys(dirStructureMock[1])[0];
  const folderFile = dirStructureMock[1][folderName][0];

  expect(flattenStructure[1]).toBe(`${folderName}/${folderFile}`);
});
