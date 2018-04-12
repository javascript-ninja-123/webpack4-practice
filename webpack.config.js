const webpack = require('webpack');
const path = require('path');

//plugins
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')


const pathName = 'build';
const VENDOR_LIBS = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "react-router",
  "redux",
  "redux-form",
  "redux-thunk"
];

module.exports = {
  entry: {
    bundle:'./src/index.js',
    vendor:VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, pathName),
    filename:'[name].[hash].js',
  },
  devtool: "eval",
  devServer: {
  contentBase: path.join(__dirname, pathName),
  compress: true,
  port: 9000
},
  module: {
  rules: [
    {
      test: /\.js$/,
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
      use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
    }
  ]
},
plugins: [
   new webpack.optimize.SplitChunksPlugin({names:['vendor','manifest']}),
   // new CleanWebpackPlugin([pathName]),
   new ExtractTextPlugin("styles.css"),
   new HtmlWebpackPlugin({template: './src/index.html'}),
   new webpack.DefinePlugin({
     "process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV)
   })
 ]
};
