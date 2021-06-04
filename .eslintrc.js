module.exports = {
  'env': {
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-return-await': 'error',
    "no-console": 'warn',
    "no-empty-function": 'error',
    "no-return-assign": 'error',
    "no-unreachable": 'error',
    "no-trailing-spaces": 'error',
    "require-await": 'error',
    "no-multi-spaces": "error",
    "keyword-spacing": ["error", { before: true}],
    "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }]
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules']
};
