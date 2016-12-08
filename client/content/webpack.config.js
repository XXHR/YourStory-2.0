const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./src/scripts/index.jsx'],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'content.js'
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'ignore-loader'
    },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-1'],
          plugins: ['transform-decorators-legacy']
        }
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  }
}