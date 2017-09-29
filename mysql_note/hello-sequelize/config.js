// config.js实际上是一个简单的配置文件：

var config = {
    database: 'test', // 使用哪个数据库
    username: 'www', // 用户名
    password: 'www', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};

module.exports = config;


// 下面，我们就可以在app.js中操作数据库了
// 使用Sequelize操作MySQL需要先做两件准备工作
// 1.第一步，创建一个sequelize对象实例

// const Sequelize = require('sequelize');
// const config = require('./config');

// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

// 2.第二步，定义模型Pet，告诉Sequelize如何映射数据库表

// var Pet = sequelize.define('pet', {
//     id: {
//         type: Sequelize.STRING(50),
//         primaryKey: true
//     },
//     name: Sequelize.STRING(100),
//     gender: Sequelize.BOOLEAN,
//     birth: Sequelize.STRING(10),
//     createdAt: Sequelize.BIGINT,
//     updatedAt: Sequelize.BIGINT,
//     version: Sequelize.BIGINT
// }, {
//         timestamps: false
//     });