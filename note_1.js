//-----------------基本模块-------------------
//console、process

// js有且仅有一个全局对象
// 在浏览器中，叫window对象
// 而在nodeJs环境，也有唯一的全局对象，叫global

//console
// 进入node的交互环境（命令行node），可以直接输入：
// > global.console
// log: [Function: bound ],
// info: [Function: bound ],
// warn: [Function: bound ],
// error: [Function: bound ],
// dir: [Function: bound ],
// time: [Function: bound ],
// timeEnd: [Function: bound ],
// trace: [Function: bound trace],
// assert: [Function: bound ],
// Console: [Function: Console] }

//process
// process 也是node提供的一个对象，他代表当前node进程。通过process对象可以拿到许多有用信息:
// > process === global.process;
// true
// > process.version;
// 'v5.2.0'
// > process.platform;
// 'darwin'
// > process.arch;
// 'x64'
// > process.cwd(); //返回当前工作目录
// '/Users/michael'
// > process.chdir('/private/tmp'); // 切换当前工作目录
// undefined
// > process.cwd();
// '/private/tmp'

//js 是由事件驱动执行的单线程模型，node也不例外。node不断执行响应事件的 js 函数，知道没有任何响应事件的函数可以执行时，node就退出了
// 如果我们想在下一次事件响应中执行代码，可以调用process.nextTick():
// test.js

// process.nextTick()将在下一轮事件循环中调用:
// process.nextTick(function () {
//     console.log('nextTick callback!');
// });
// console.log('nextTick was set!');

// 输出：
// nextTick was set!
// nextTick callback!
// 这说明传入process.nextTick()的函数不是立刻执行，而是要等到下一次事件循环

// Node.js进程本身的事件就由process对象来处理。如果我们响应exit事件，就可以在程序即将退出时执行某个回调函数：
// process.on('exit', function(code){
//     console.log('about to exit with code:' + code);
// });

// //判断 js 执行环境
// if(typeof(window) === 'undefined'){
//     console.log('node.js');
// }else{
//     console.log('browser');
// }

