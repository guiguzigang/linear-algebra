module.exports = {
  extends: [
    'standard',
    'plugin:prettier/recommended'
    // "prettier"
    // "eslint:recommended"
  ],
  plugins: ['html'],
  globals: {
    d3: true
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    amd: false,
    mocha: true,
    jasmine: false,
    phantomjs: false,
    jquery: false,
    prototypejs: false,
    shelljs: false
  },
  rules: {
    'no-new': 'off',
    'no-debugger': 'off',
    'one-var': 'off',
    'no-unused-vars': 'off',
    'no-tabs': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off'
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  }
}
