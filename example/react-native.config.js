const path = require('path');
const pak = require('../package.json');

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
