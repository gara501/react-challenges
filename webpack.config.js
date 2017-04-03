const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "./app/App.js"
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'react-hot-loader'
      },
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            'react'
          ]
        }
      }],
      include: [
        path.resolve(__dirname, './app')
      ]},
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
        publicPath: path.resolve(__dirname, './dist')
      })
    },
    {
      test: /\.json$/,
      loader: "json-loader"
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Challenges',
      hash: true,
      template: './app/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    })
  ],
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/graphql": "http://localhost:3000"
    }
  }
}
