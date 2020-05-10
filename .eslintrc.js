const path = require('path');

module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    'max-len': ['error', { code: 120 }],
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@root', path.resolve(__dirname)],
        ['@src', path.resolve(__dirname, 'src')],
      ],
    },
  },
};
