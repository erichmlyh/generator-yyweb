var webpack = require("webpack");
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')


// console.log('-- vueLoaderConfig start ----');
// console.log(vueLoaderConfig);
// console.log('-- vueLoaderConfig end ----');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  // entry: {
  //   app: './src/main.js'
  // },
  entry: utils.getEntries('./module/**/*.js'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'css': path.resolve(__dirname, '../src/css'),
      'js': path.resolve(__dirname, '../src/js'),
      'images': path.resolve(__dirname, '../src/images'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'components': path.resolve(__dirname, '../src/components'),
      'parts': path.resolve(__dirname, '../src/parts'),

      'common': path.resolve(__dirname, '../common'),
      'api': path.resolve(__dirname, '../config/api'),
      'vue$': 'vue/dist/vue.esm.js',

      '@lib': path.resolve(__dirname, '../../../../lib'),
      '@components': path.resolve(__dirname, '../../../../components'),
      '@common': path.resolve(__dirname, '../../../../common'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.tpl$/,
        loader: 'underscore-template-loader',
        query: {
          prependFilenameComment: __dirname
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs=img:src img:data-src'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp3|wav|ogg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: utils.assetsPath('others/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
}
