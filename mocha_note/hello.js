// hello.js

module.exports = function (...rest) {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};

// 这个函数非常简单，就是对输入的任意参数求和并返回结果。

// 如果我们想对这个函数进行测试，可以写一个test.js，然后使用Node.js提供的assert模块进行断言