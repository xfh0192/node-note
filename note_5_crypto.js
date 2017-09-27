// ----------- crypto ------------

// crypto模块的目的是为了提供通用的加密和哈希算法。
// 用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。
// Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

// MD5 和 SHA1
// MD5 是一种常用的哈希算法，用于给任意数据一个“签名”。 这个签名通常用一个十六进制的字符串表示：
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update()
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544

// update()方法默认字符串编码为UTF-8，也可以传入Buffer。
// 如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果1f32b9c9932c02227819a4151feed43e131aca40。
// 还可以使用更安全的sha256和sha512。


//-----加密这块很少接触，碰到了再继续看