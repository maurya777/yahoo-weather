var webpackCfg = require('./webpack.config');
const args = require('minimist')(process.argv.slice(2));

// Set node environment to testing
process.env.NODE_ENV = 'test';

function isDebug() {
  return args.env == 'test-debug';
}

//base karma settings
var karmaConfigSettings = {
  basePath: '',
  browsers: ['PhantomJS'],
  //files is a karma-webpack setting - each one of these acts as a webpack entry point
  files: [
    'test/loadtests.js'
  ],
  port: 8090,
  captureTimeout: 60000,
  frameworks: ['mocha', 'chai', 'sinon', 'intl-shim'],
  singleRun: true,
  reporters: ['mocha', 'coverage'],
  preprocessors: {
    'test/loadtests.js': ['webpack', 'sourcemap']
  },
  webpack: webpackCfg,
  webpackServer: {
    noInfo: true
  },
  coverageReporter: {
    dir: 'coverage/',
    reporters: [
      { type: 'html' },
      { type: 'text' }
    ]
  },
  mochaReporter: {
    showDiff: true
  }
};

//special settings if debug mode
if (isDebug()) {
  console.log('Loading karma configuration in test-debug mode.');
  karmaConfigSettings.reporters = ['mocha']; //no coverage
  karmaConfigSettings.coverageReporter = {};
  karmaConfigSettings.browsers = ['Chrome'];
  karmaConfigSettings.singleRun = false;
}

module.exports = function (config) {
  karmaConfigSettings.client = {
    mocha: {
      grep: config.grep
    }
  };
  config.set(karmaConfigSettings);
};
