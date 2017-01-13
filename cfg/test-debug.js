'use strict';

// The debug configuration is the same as test, except it doesn't use the isparta code coverpage preloader

//start with the test config
let testConfig = require('./test');

//remove preLoaders (i.e. isparta)
testConfig.module.preLoaders = [];

testConfig.devtool = 'inline-source-map'; // was 'eval', but 'inline-source-map' seems more stable

module.exports = testConfig;
