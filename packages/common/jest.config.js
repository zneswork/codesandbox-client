module.exports = {
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(j|t)s$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['lib'],
};
