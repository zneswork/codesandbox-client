module.exports = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/(dist|compiled)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
