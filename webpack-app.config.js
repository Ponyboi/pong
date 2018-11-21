var path = require('path');
var nodeExternals = require('webpack-node-externals');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.resolve(__dirname, './public/');
module.exports = {
  mode: 'development',
  target: 'web',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  resolve: {
    alias: {
      components: path.resolve(appPath, 'js/components'),
      constants: path.resolve(appPath, 'js/constants'),
      data: path.resolve(appPath, 'js/data'),
      helpers: path.resolve(appPath, 'js/helpers'),
      managers: path.resolve(appPath, 'js/managers'),
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ],
};
