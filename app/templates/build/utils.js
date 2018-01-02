var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  var cssLoaderIncludeComponents = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
      modules: true,
      localIdentName: '[local]__[hash:base64:5]'
    }
  }

  var cssLoaderExcludeComponents = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }
  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (inCludeComponents, loader, loaderOptions) {
    var loaders = [cssLoaderExcludeComponents];
    if (inCludeComponents === true) {
        loaders = [cssLoaderIncludeComponents];
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    loaders.push(postcssLoader);

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    includeComponents: {
      css: generateLoaders(true),
      postcss: generateLoaders(true),
      less: generateLoaders(true, 'less'),
      sass: generateLoaders(true, 'sass', { indentedSyntax: true }),
      scss: generateLoaders(true, 'sass'),
      stylus: generateLoaders(true, 'stylus'),
      styl: generateLoaders(true, 'stylus')
    },
    exCludeComponents: {
      css: generateLoaders(false),
      postcss: generateLoaders(false),
      less: generateLoaders(false, 'less'),
      sass: generateLoaders(false, 'sass', { indentedSyntax: true }),
      scss: generateLoaders(false, 'sass'),
      stylus: generateLoaders(false, 'stylus'),
      styl: generateLoaders(false, 'stylus')
    }

  }
}



// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders.exCludeComponents) {
    var loader = loaders.exCludeComponents[extension]
    output.push({
      // test: new RegExp('^(?!.*components)(.*)\\.' + extension + '$'),
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  for (var extension in loaders.includeComponents) {
    var loader = loaders.includeComponents[extension]
    output.push({
      test: new RegExp('^(.*components)(.*)\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}


exports.getEntries = function (globPath) {
  var entries = {}
  /**
  * 读取src目录,并进行路径裁剪
  */
  var baseDirArr = __dirname.split('/');
  var baseDirLen = baseDirArr.length;
  baseDirArr.splice(0, baseDirLen - 3);
  baseDirArr.pop();
  var baseDir = baseDirArr.join('/');
  glob.sync(globPath).forEach(function (entry) {
    /**
    * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
    * path.extname 获取文件后缀
    */

    var basename = path.basename(entry, path.extname(entry), 'router.js') // 过滤router.js
    if (basename == "router") {
      return true;
    }
    // ***************begin***************
    // 当然， 你也可以加上模块名称, 即输出如下： { module/main: './src/module/index/main.js', module/test: './src/module/test/test.js' }
    // 最终编译输出的文件也在module目录下， 访问路径需要时 localhost:8080/module/index.html
    // slice 从已有的数组中返回选定的元素, -3 倒序选择，即选择最后三个
    // var tmp = entry.split('/').splice(-3)
    // var pathname = tmp.splice(0, 1) + '/' + basename; // splice(0, 1)取tmp数组中第一个元素
    // console.log(pathname)
    // entries[pathname] = entry
    // ***************end***************
    // entries['zt/' + baseDir + '/' + basename] = entry
    entries[basename] = entry
  });
  // console.log(entries);
  // 获取的主入口如下： { main: './src/module/index/main.js', test: './src/module/test/test.js' }
  return entries;
}
