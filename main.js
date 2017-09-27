'use strict';
//调用hello模块的greet函数

//引入hello模块
// 引入的模块作为变量保存在greet变量中，那greet变量到底是什么东西？
// 其实变量greet就是在hello.js中我们用module.exports = greet;输出的greet函数。
// 所以，main.js就成功地引用了hello.js模块中定义的greet()函数，接下来就可以直接使用它了。
var hello = require('./hello');     // 不要忘了写相对目录
//var greet = require('hello');     //如果只写模块名，则Node会依次在内置模块、全局模块和当前模块下查找hello.js，你很可能会得到一个错误

//一个模块想要对外暴露变量（函数也是变量），可以用module.exports = variable;，一个模块要引用其他模块暴露的变量，用var ref = require('module_name');就拿到了引用模块的变量。

var s = 'Michael';

hello.greet(s);   //Hello, Michael!

