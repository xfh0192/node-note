'use strict';					//第一行总是写上'use strict';是因为我们总是以严格模式运行JavaScript代码，避免各种潜在陷阱
                                //node --use_strict calc.js  执行时，可以传递--use_strict参数来开启严格模式
// console.log("hello world")


//模块的名字就是文件名（去掉.js后缀），所以hello.js文件就是名为hello的模块

var s = "greet";

function greet(name){
    console.log(s + ',' + name + '!');
}

function hello(name){
    console.log('hello' + ',' + name + '!');
}

greet(s);

// module.exports = greet;         //把函数greet作为模块的输出暴露出去，这样其他模块就可以使用greet函数了
module.exports = {
    greet: greet,
    hello: hello
}