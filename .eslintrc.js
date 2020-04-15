module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react/recommended',
    'plugin:relay/recommended',
    'prettier/react',
  ],
  plugins: ['babel', 'prettier', 'react', 'relay'],
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
    'arrow-body-style': ['warn', 'as-needed'],
    'no-console': 'warn',
    // style specific
    'no-trailing-spaces': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    quotes: ['error', 'single'],
    semi: 'error',
    curly: ['error', 'all'],
    'arrow-parens': ['warn', 'as-needed'],
    camelcase: ['warn', { properties: 'never', ignoreDestructuring: true }],
    '@typescript-eslint/camelcase': [
      'warn',
      { properties: 'never', ignoreDestructuring: true },
    ],
  },
};
