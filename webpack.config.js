const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSASS = new ExtractTextPlugin('bundle.min.css');

module.exports = {
  context: path.resolve(__dirname, 'assets'),
  entry: './main_webpack.es6',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'assets')
  },
  module: {
    rules: [{
        test: /\.es6$/,
        include: path.resolve(__dirname, 'assets'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2016']
            ]
          }
        }]
      },
      {
        test: /\_webpack\.sass$/,
        include: path.resolve(__dirname, 'assets'),
        use: extractSASS.extract({
          use: [{
              loader: 'css-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          ]
        })
      }]
  },
  plugins: [
    extractSASS
  ]
};
