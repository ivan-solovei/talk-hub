module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', 
    "prettier",
    "unused-imports",
    "no-loops"
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "curly": 2,
    "default-case": 2,
    "default-param-last": 2,
    "eqeqeq": 2,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "unused-imports/no-unused-imports": 2,
    "unused-imports/no-unused-vars": 2,
    "no-caller": 2,
    "no-eval": 2,
    "no-extra-bind": 2,
    "no-lone-blocks": 2,
    "no-return-await": 2,
    "vars-on-top": 2,
    "no-var": 2,
    "prefer-const": 2,
    "no-use-before-define": 2,
    "@typescript-eslint/no-use-before-define": 2,
    "camelcase": 1,
    "no-case-declarations": 0,
  },
  "overrides": [
    {
      "files": [
        "libs/dal/src/entities/**"
      ],
      "rules": {
        "import/no-cycle": 0,
      },
    },
    {
      "files": [
        "**.dtos.**"
      ],
      "rules": {
        "max-classes-per-file": 0,
      },
    },
  ],
};
