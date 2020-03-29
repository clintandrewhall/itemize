module.exports = {
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
    },
  },
  rules: {
    indent: ['error', 2],
    // enable additional rules
    'linebreak-style': ['error', 'unix'],
    // node specific
    'global-require': 'error',
    'handle-callback-err': 'error',
    // override default options for rules from base configurations
    'no-cond-assign': ['error', 'always'],
    // disable rules from base configurations
    'arrow-body-style': 'off',
    'no-console': 'off',
    'no-inner-declarations': 'off',
    'no-redeclare': 'off',
    // style specific
    'no-trailing-spaces': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    quotes: ['error', 'single'],
    semi: 'error',
  },
};
