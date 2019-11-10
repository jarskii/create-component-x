import path from 'path';
import flatten from '../flatten.js';
import getDirFilesSync from '../getDirFilesSync';

import { structure as dirStructureMock, deeperFilePath } from '../__mock__/dirStructure';

const rootDir = path.resolve();
const directoryForTesing = path.join(rootDir, 'src', 'helpers', '__mock__', 'dirForTesting');

test('Testing getDirFilesSync func', () => {
  const structure = getDirFilesSync(directoryForTesing);

  expect(JSON.stringify(structure)).toBe(JSON.stringify(dirStructureMock));
});

test('Testing flatten func', () => {
  const flattenStructure = flatten(dirStructureMock);

  expect(flattenStructure[2]).toBe(deeperFilePath);
});
