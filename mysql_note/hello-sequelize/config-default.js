
// 默认的数据库配置

 var config = {
     dialect: 'mysql',
     database: 'nodejs',
     username: 'www',
     password: 'www',
     host: 'localhost',
     port: 3306
 };

 module.exports = config;

 // config-override.js 可以这样配置

//  var config = {
//     database: 'production',
//     username: 'www',
//     password: 'secret-password',
//     host: '192.168.1.199'
// };

// module.exports = config;

// 但是demo中是没有生产环境的。。所以记录下来就算了