// hello.js

module.exports = function (...rest) {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};


// hello-test/
// |
// +- .vscode/
// |  |
// |  +- launch.json <-- VSCode 配置文件
// |
// +- hello.js <-- 待测试js文件
// |
// +- test/ <-- 存放所有test
// ｜ ｜
// |  +- hello-test.js <-- 测试文件
// |
// +- package.json <-- 项目描述文件
// |
// +- node_modules/ <-- npm安装的所有依赖包


// 依赖包
// "dependencies": {},
// "devDependencies": {
//   "mocha": "3.0.2"
// }

// 这次我们并没有把依赖包添加到 "dependencies"中，而是"devDependencies"：
// 如果一个模块在运行的时候并不需要，仅仅在开发时才需要，就可以放到devDependencies中。这样，正式打包发布时，devDependencies的包不会被包含进来。

// 注意，很多文章会让你用命令npm install -g mocha把mocha安装到全局module中。这是不需要的。尽量不要安装全局模块，因为全局模块会影响到所有Node.js的工程

// mocha默认会执行test目录下的所有测试，不要去改变默认目录。