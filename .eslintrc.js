const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/class-name-casing': 0,
  },
  globals: {
    page: true,
  },
};
