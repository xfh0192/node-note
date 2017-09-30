// test.js

const assert = require('assert');
const sum = require('./hello');

assert.strictEqual (sum(), 0);
assert.strictEqual (sum(1), 1);
assert.strictEqual (sum(1,2), 3);
assert.strictEqual (sum(1,2,3), 6);

// assert模块非常简单，它断言一个表达式为true。如果断言失败，就抛出Error
// 可以在Node.js文档中查看assert模块的所有API  https://nodejs.org/dist/latest/docs/api/assert.html

// 单独写一个test.js的缺点是没法自动运行测试，而且，如果第一个assert报错，后面的测试也执行不了了。

// 如果有很多测试需要运行，就必须把这些测试全部组织起来，然后统一执行，并且得到执行结果。这就是我们为什么要用mocha来编写并运行测试