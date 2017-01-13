'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let WebpackShellPlugin = require('webpack-shell-plugin');

let entries = defaultSettings.getEntries();

// Take entry points, add hot loading
let devEntries = Object.keys(entries).reduce((previous, current) => {
  previous[current] = [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server'
  ].concat(entries[current]);
  return previous;
}, {});

let config = Object.assign({}, baseConfig, {
  entry: devEntries,
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: [].concat(
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
