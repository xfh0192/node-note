'use strict'

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录
// process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。
// 第一个元素为process.execPath。如果需要获取argv[0]的值请参见 process.argv0。
// 第二个元素为当前执行的JavaScript文件路径。剩余的元素为其他命令行参数。
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// // 创建服务器
// var server = http.createServer(function(request, response){
//     // 获得url的path，类似 '/css/bootstrap.css';
//     var pathname = url.parse(request.url).pathname;
//     // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css';
//     var filepath = path.join(root, pathname);
//     // 获取文件状态
//     fs.stat(filepath, function(err, stats){
//         if(!err && stats.isFile()){
//             // 没有出错并且文件存在
//             console.log('200 ' + request.url);
//             // 发送200响应;
//             response.writeHead(200);
//             // 将文件流导向response
//             fs.createReadStream(filepath).pipe(response);
//         }else{
//             //  出错了或者文件不存在
//             console.log('404 ' + request.url);
//             // 发送404响应
//             response.writeHead(404);
//             response.end('404 Not Found');
//         }
//     })
// })

// server.listen(8888);

// console.log('Server is running at http://127.0.0.1:8888/');

// 没有必要手动读取文件内容。由于response对象本身是一个Writable Stream，直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应

// 在命令行运行node file_server.js /path/to/dir，把/path/to/dir改成你本地的一个有效的目录，然后在浏览器中输入http://localhost:8080/index.html

//我运行的本机目录： node file_server.js d:\\nodeProject\\personalResume\\dist
// 200 /index.html
// 200 /static/css/app.4a275551b10558e1b74fa94103e6de61.css
// 200 /static/js/manifest.a1bd68dcc4ba4e8cce0f.js
// 200 /static/js/vendor.d41796206e46878daef4.js
// 200 /static/js/app.36d1002328c091c65125.js

// 练习
// 在浏览器输入http://localhost:8080/时，会返回404，原因是程序识别出HTTP请求的不是文件，而是目录。
// 请修改file_server.js，如果遇到请求的路径是目录，则自动在目录下依次搜索index.html、default.html，如果找到了，就返回HTML文件的内容。

var server = http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
    fs.stat(filepath, function(err, stats){
        if(!err && stats.isFile()){
            console.log('200: ' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        }
        else if(!err && stats.isDirectory()){
            var filepath1 = path.join(filepath, 'index.html');
            var filepath2 = path.join(filepath, 'default.html');
            if(fs.existsSync(filepath1)){
                exist(filepath1, response);
            }else if(fs.existsSync(filepath2)){
                exist(filepath2, response);
            }
            else{
                fail(request, response);
            }
        }
        else{
            fail(resquest, response);
        }
    })
})

server.listen(8888);
console.log('Server is running at http://127.0.0.1:8888/');

function exist(filepath, response){
    console.log('200 ' + filepath);
    response.writeHead(200);
    fs.createReadStream(filepath).pipe(response);
}

function fail(request, response){
    console.log('404 ' + resquest.url);
    response.writeHead(404);
    response.end('404 Not Found');
}