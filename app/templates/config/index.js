// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')


var baseDirArr = __dirname.split('/');
var baseDirLen = baseDirArr.length;
baseDirArr.splice(0, baseDirLen - 3);
baseDirArr.pop();
var baseDir = baseDirArr.join('/');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/zt', baseDir),
    // assetsSubDirectory: 'static',
    assetsSubDirectory: '',
    // assetsPublicPath: '/zt/' + baseDir + '/',
    assetsPublicPath: 'https://webmap0.bdimg.com/zt/' + baseDir + '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8666,
    autoOpenBrowser: true,
    assetsSubDirectory: '',
    // assetsPublicPath: '/',
    assetsPublicPath: '/zt/' + baseDir + '/',
    proxyTable: {},
    // proxyTable: {
    //   '/mock/activity': {
    //     target: 'http://zt.baidu.com/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/mock/activity': '/activity'
    //     }
    //   }
    // },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  remote: {
     assetsRoot: path.resolve(__dirname, '../deve/zt', baseDir),
     assetsSubDirectory: '',
     assetsPublicPath: '/zt/' + baseDir + '/'
  }
}
