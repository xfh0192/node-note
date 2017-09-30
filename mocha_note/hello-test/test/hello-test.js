
// const assert = require('assert');

// const sum = require('../hello');

// describe('#hello.js', () => {

//     describe('#sum()', () => {
//         it('sum() should return 0', () => {
//             assert.strictEqual(sum(), 0);
//         });

//         it('sum() should return 1', () => {
//             assert.strictEqual(sum(1,2), 3);
//         });

//         it('sum(1,2) should return 3', () => {
//             assert.strictEqual(sum(1,2,3), 6);
//         });
//             it('sum(1, 2, 3) should return 6', () => {
//                 assert.strictEqual(sum(1, 2, 3), 6);
//             });
//     });

// });

// 这里我们使用mocha默认的BDD-style的测试。describe可以任意嵌套，以便把相关测试看成一组测试。

// 每个it("name", function() {...})就代表一个测试。例如，为了测试sum(1, 2)，我们这样写：
// it('sum(1, 2) should return 3', () => {
//     assert.strictEqual(sum(1, 2), 3);
// });

// 编写测试的原则是，一次只测一种情况，且测试代码要非常简单。
// 我们编写多个测试来分别测试不同的输入，并使用assert判断输出是否是我们所期望的


// 运行测试 ===》 https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00147204317563462840426beb04a849ba813eb46bb347c000



//  ---------------------------------------- before和after ----------------------------------------

// 在测试前初始化资源，测试后释放资源是非常常见的。mocha提供了before、after、beforeEach和afterEach来实现这些功能。

// 我们把hello-test.js改为：

const assert = require('assert');
const sum = require('../hello');

describe('#hello.js', () => {
    describe('#sum()', () => {
        before(function () {
            console.log('before:');
        });

        after(function () {
            console.log('after.');
        });

        beforeEach(function () {
            console.log('  beforeEach:');
        });

        afterEach(function () {
            console.log('  afterEach.');
        });

        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        });

        it('sum(1) should return 1', () => {
            assert.strictEqual(sum(1), 1);
        });

        it('sum(1, 2) should return 3', () => {
            assert.strictEqual(sum(1, 2), 3);
        });

        it('sum(1, 2, 3) should return 6', () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });
    });
});