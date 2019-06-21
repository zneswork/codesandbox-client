module.exports = {
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/create-zip\\/.*\\/files/'],
  testRegex: '(test|spec)\\.(j|t)sx?$',
  transformIgnorePatterns: [
    'node_modules/(?!(common|lodash-es|sandbox-hooks|react-icons)/.+\\.js$)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '\\.html$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(t|j)s$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};
