const path = require('path');
const pak = require('../package.json');

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts', './assets/images'],
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
