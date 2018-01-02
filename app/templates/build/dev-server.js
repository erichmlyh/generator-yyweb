//require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
const router = express.Router()


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})



// 路由设置如果放到 connect-history-api-fallback 插件后会失效
app.get('/mock/*', function (req, res) {
    var apiPaths = req.originalUrl.split("?")[0].split('/');
    var mockPath = path.join(__dirname, "../mock");
    var mockFile = apiPaths[apiPaths.length - 1];
    var mockPath = path.resolve(mockPath, mockFile);
    var query = (function () {
                var url = req.originalUrl.split("?")[1] || "";
                var theRequest = {};
                var strs = url.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    var temp = decodeURIComponent(strs[i]);
                    var index = temp.indexOf('=');
                    theRequest[temp.substr(0, index)] = temp.substr(index + 1);
                }
                return theRequest;
        })();
    var api = require(mockPath);
    var ret = "";
    var type = Object.prototype.toString.call(api);
    if(type == "[object Function]") {
        ret = JSON.stringify(api(query));
    } else if(type == "[object Object]") {
        ret = JSON.stringify(api);
    } else {
        ret = api.toString();
    }
    if (query.callback) {
        ret = query.callback + "(" + ret + ")"
    }
    delete require.cache[require.resolve(mockPath)]; // 清除node的require缓存
    res.send(ret);
});


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port + config.dev.assetsPublicPath

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri + 'index.html')
  }
  _resolve()
})

var server = app.listen(port)

// module.exports = {
//   ready: readyPromise,
//   close: () => {
//     server.close()
//   }
// }
