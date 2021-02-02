const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

module.exports = {
  entry: './dev/Main/index.js',
  output: {
    path: path.resolve(__dirname, "site"),
    filename: "bundle.js",
  },
  mode: NODE_ENV,
  devtool: isDev && "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
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
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'dev', 'static'),
        to: path.resolve(__dirname, 'site'),
      }
    ]),
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(isDev),
    }),
  ]
};