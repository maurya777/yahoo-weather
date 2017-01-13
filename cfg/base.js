'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
let npmBase = path.join(__dirname, '../node_modules');

module.exports = {
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: '/' + defaultSettings.publicPath,
    noInfo: false,
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      src: `${defaultSettings.srcPath}/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.WEBPACK_ENV
    }
  },
  module: {}
};
