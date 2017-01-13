'use strict';

let path = require('path');
let srcPath = path.join(__dirname, '/../src/');

let baseConfig = require('./base');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /^[^\.]*\.(js|jsx)$/,
        loader: 'isparta',
        include: [
          path.join(__dirname, '/../src')
        ]
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl|eot|ttf|svg)$/,
        loader: 'null-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [].concat(
          [
            path.join(__dirname, '/../src'),
            path.join(__dirname, '/../test')
          ]
        )
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    alias: {
      src: srcPath,
      config: srcPath + 'config/' + process.env.WEBPACK_ENV
    }
  },
  plugins: [
  ],
  externals: {
    'cheerio': 'window'
  }
};
