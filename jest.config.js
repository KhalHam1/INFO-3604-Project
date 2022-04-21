// jest.config.js
module.exports = {
    // ...other options
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    transform: {
      '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  };