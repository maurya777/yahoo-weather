/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8080;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    noParse: [],
    preLoaders: [
      {
        test: /\.js$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  };
}

function getEntries(){
  return {
    'app' : [
      './src/app'
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: 'assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  getEntries: getEntries
};
