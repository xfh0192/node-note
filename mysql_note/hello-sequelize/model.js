// -------------------------------- 使用 Model -----------------------------------

// 要使用Model，就需要引入对应的Model文件，例如：User.js。一旦Model多了起来，如何引用也是一件麻烦事
// 自动化永远比手工做效率高，而且更可靠。我们写一个model.js，自动扫描并导入所有Model:

const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter( (f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};

for (var f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
};

module.exports.sync = () => {
    db.sync();
};

// 这样，需要用的时候，写起来就像这样：
// const model = require('./model');
// let
//     Pet = model.Pet,
//     User = model.User;

// var pet = await Pet.create({ ... });


// -------------------------- 工程结构 ----------------------------

// 最终，我们创建的工程model-sequelize结构如下：
// model-sequelize/
// |
// +- .vscode/
// |  |
// |  +- launch.json <-- VSCode 配置文件
// |
// +- models/ <-- 存放所有Model
// |  |
// |  +- Pet.js <-- Pet
// |  |
// |  +- User.js <-- User
// |
// +- config.js <-- 配置文件入口
// |
// +- config-default.js <-- 默认配置文件
// |
// +- config-test.js <-- 测试配置文件
// |
// +- db.js <-- 如何定义Model
// |
// +- model.js <-- 如何导入Model
// |
// +- init-db.js <-- 初始化数据库
// |
// +- app.js <-- 业务代码
// |
// +- package.json <-- 项目描述文件
// |
// +- node_modules/ <-- npm安装的所有依赖包

// // 注意到我们其实不需要创建表的SQL，因为Sequelize提供了一个sync()方法，可以自动创建数据库。
// 这个功能在开发和生产环境中没有什么用，但是在测试环境中非常有用。
// 测试时，我们可以用sync()方法自动创建出表结构，而不是自己维护SQL脚本。
// 这样，可以随时修改Model的定义，并立刻运行测试。
// 开发环境下，首次使用sync()也可以自动创建出表结构，避免了手动运行SQL的问题。