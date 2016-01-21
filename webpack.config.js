'use strict';

var path = require('path');

module.exports = {
  entry: {
    javascript: './public/index.jsx',
    html: './public/index.html'
  },
  output: {
    filename: 'bundle.js',
    path: './build'
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      // {
      //   test: /\.scss$/,
      //   loaders: ["style", "css", "sass"]
      // },
      {
        test: /\.(html|css)$/i,
        exclude: /public\/images/,
        loader: 'file?name=[name].[ext]'
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline'
      // }
    ]
  },
  resolve: {
    root: [path.resolve(__dirname, 'public'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx']
  }
};
