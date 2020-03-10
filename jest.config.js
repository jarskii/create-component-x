module.exports = {
  "name": "create-component-x",
  "verbose": false,
  testMatch: ['**/__tests__/*.test.js'],
  setupFiles: [
    "<rootDir>/jest.init.js"
  ],
  testPathIgnorePatterns: [
    '<rootDir>/examples/'
  ]
};
