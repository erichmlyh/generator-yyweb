/* eslint-disable */
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var prodWebpackConfig = require('./webpack.prod.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(prodWebpackConfig, {
  resolve: {
    alias: {
      'origin': path.resolve(__dirname, '../config/api/qa.origin.js'),
    }
  },
  output: {
    path: config.remote.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: config.remote.assetsPublicPath
  }
})

module.exports = webpackConfig
/* eslint-enable */