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
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
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
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
      {
        test: /\_webpack\.sass$/,
        include: path.resolve(__dirname, 'assets'),
        use: extractSASS.extract({
          use: [
            {
              loader: 'css-loader?sourceMap',
              options: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            },
            {
              loader: 'sass-loader?sourceMap',
              options: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.resolve(__dirname, 'assets'),
                ]
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
