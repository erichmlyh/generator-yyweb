"use strict";
var generators = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var path = require("path");
var fs= require("fs");

module.exports = generators.Base.extend({
  initializing: function() {
    //初始化准备工作
  },

  prompting: function() {
    //接受用户输入
    var done = this.async(); //当处理完用户输入需要进入下一个生命周期阶段时必须调用这个方法

    //yeoman-generator 模块提供了很多内置的方法供我们调用，如下面的this.log , this.prompt , this.template , this.spawnCommand 等

    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Welcome to the groundbreaking " + chalk.red("example") + " generator!"
      )
    );
    // this.name = path.basename(process.cwd());
    this.module = "y2018";
    this.name = "";
    this.description = "";
    this.author = "";
    var prompts = [
     {
        type: "input",
        name: "module",
        message: "模块名:",
        default: this.module
      },
      {
        type: "input",
        name: "name",
        message: "项目名称:",
        default: this.name
      },
      {
        type: "input",
        name: "description",
        message: "项目描述:",
        default: this.description
      },
    //   {
    //     type: "list", // 提供选择的列表
    //     name: "kissy",
    //     message: "which version of kissy",
    //     choices: [
    //       {
    //         name: "KISSY@1.4.x",
    //         value: "1.4.x"
    //       },
    //       {
    //         name: "KISSY@6.0.x",
    //         value: "6.0.x"
    //       }
    //     ]
    //   },
      {
        type: "input",
        name: "author",
        message: "author:",
        default: this.author
      }
    ];
    this.prompt(
      prompts,
      function(props) {
        this.name = props.name;
        this.pkgName = props.name;
        this.kissy = props.kissy;
        this.repo = props.repo;
        this.license = props.license;
        this.author = props.author;
        this.description = props.description;

        done(); //进入下一个生命周期阶段
      }.bind(this)
    );
  },

  writing: {
    //生成目录结构阶段
    app: function() {
    //默认源目录就是生成器的templates目录，目标目录就是执行`yo example`时所处的目录。调用this.template用Underscore模板语法去填充模板文件
    //   this.template("_package.json", "package.json"); 
    //   this.template("_gulpfile.js", "gulpfile.js");
    //   this.copy("_src/less/index.less", "src/less/index.less");
    //   this.copy("_src/js/index.js", "src/js/index.js");
        var pathName = path.resolve(process.cwd(), "dep/" + this.module + "/" + this.name + "/");
        fs.exists(pathName, function(isExists) {
            if (isExists) {
                throw new Error("该项目已存在");
            } else {
                this.directory(".", pathName);
                // this.template("package.json", pathName + "package.json"); 
                // this.template("README.md", pathName + "README.md"); 
            }
        }.bind(this)); 
    }
  },

  install: function() {
    // var done = this.async();
    // this.spawnCommand("npm", ["install"]) //安装项目依赖
    //   .on("exit", function(code) {
    //     if (code) {
    //       done(new Error("code:" + code));
    //     } else {
    //       done();
    //     }
    //   })
    //   .on("error", done);
  },
  end: function() {
    // var done = this.async();
    // this.spawnCommand("gulp") //生成器退出前运行gulp，开启watch任务
    //   .on("exit", function(code) {
    //     if (code) {
    //       done(new Error("code:" + code));
    //     } else {
    //       done();
    //     }
    //   })
    //   .on("error", done);
  }
});
