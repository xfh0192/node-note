// config.js实际上是一个简单的配置文件：

// var config = {
//     database: 'test', // 使用哪个数据库
//     username: 'www', // 用户名
//     password: 'www', // 口令
//     host: 'localhost', // 主机名
//     port: 3306 // 端口号，MySQL默认3306
// };

// module.exports = config;


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


// ------------------------- 数据模型 model 建立（db.js）之后 ---------------------------------
// 数据库配置

// 接下来，我们把简单的config.js拆成3个配置文件：

// config-default.js：存储默认的配置；
// config-override.js：存储特定的配置；
// config-test.js：存储用于测试的配置。


// ==> 然后读取配置的时候，我们用config.js实现不同环境读取不同的配置文件：

const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';       // 可设定绝对路径
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}...`);
    }
};

module.exports = config;


// 具体的规则是：
// 1.先读取config-default.js；
// 2.如果不是测试环境，就读取config-override.js，如果文件不存在，就忽略。
// 3.如果是测试环境，就读取config-test.js。

// 这样做的好处是，开发环境下，团队统一使用默认的配置，并且无需config-override.js。
// 部署到服务器时，由运维团队配置好config-override.js，以覆盖config-override.js的默认设置。
// 测试环境下，本地和CI服务器统一使用config-test.js，测试数据库可以反复清空，不会影响开发。


// 后面看使用Model, 新建 model.js