// -------------------------------------- 访问mysql ----------------------------------------

// 访问MySQL数据库只有一种方法，就是通过网络发送SQL命令，然后，MySQL服务器执行后返回结果。

// 我们可以在命令行窗口输入mysql -u root -p，然后输入root口令后，就连接到了MySQL服务器。
// 因为没有指定--host参数，所以我们连接到的是localhost，也就是本机的MySQL服务器

// 1.可能需要添加环境变量
// 2.cmd中打开mysql:  mysql -u root -p
// 3.输入exit退出MySQL命令行模式。

// 对于Node.js程序，访问MySQL也是通过网络发送SQL命令给MySQL服务器。
// 这个访问MySQL服务器的软件包通常称为MySQL驱动程序。

// 不同的编程语言需要实现自己的驱动，MySQL官方提供了Java、.Net、Python、Node.js、C++和C的驱动程序，
// 官方的Node.js驱动目前仅支持5.7以上版本，而我们上面使用的命令行程序实际上用的就是C驱动。
// 目前使用最广泛的MySQL Node.js驱动程序是开源的mysql，可以直接使用npm安装。



// ----------------- ORM --------------------

// 如果直接使用mysql包提供的接口，我们编写的代码就比较底层，例如，查询代码
connection.query('SELECT * FROM users WHERE id = ?', ['123'], function(err, rows) {
    if (err) {
        // error
    } else {
        for (let row in rows) {
            processRow(row);
        }
    }
});

// 考虑到数据库表是一个二维表，包含多行多列，例如一个pets的表：

// mysql> select * from pets;
// +----+--------+------------+
// | id | name   | birth      |
// +----+--------+------------+
// |  1 | Gaffey | 2007-07-07 |
// |  2 | Odie   | 2008-08-08 |
// +----+--------+------------+
// 2 rows in set (0.00 sec)

// 每一行可以用一个JavaScript对象表示，例如第一行：
// {
//     "id": 1,
//     "name": "Gaffey",
//     "birth": "2007-07-07"
// }

// 这就是传说中的ORM技术：Object-Relational Mapping，把关系数据库的表结构映射到对象上。是不是很简单？
// 但是由谁来做这个转换呢？所以ORM框架应运而生

// ------- Sequelize -------
// 我们选择Node的ORM框架Sequelize来操作数据库。这样，我们读写的都是JavaScript对象，Sequelize帮我们把对象变成数据库中的行。

// 用Sequelize查询 pets 表，代码像这样：
Pet.findAll()
.then(function (pets) {
    for (let pet in pets) {
        console.log(`${pet.id}: ${pet.name}`);
    }
}).catch(function (err) {
    // error
});

// 因为Sequelize返回的对象是Promise，所以我们可以用then()和catch()分别异步响应成功和失败。
// 但是用then()和catch()仍然比较麻烦。有没有更简单的方法呢？

// 可以用ES7的await来调用任何一个Promise对象，这样我们写出来的代码就变成了：
var pets = await Pet.findAll();

// 真的就是这么简单！

// await只有一个限制，就是必须在async函数中调用。上面的代码直接运行还差一点，我们可以改成：
(async () => {
    var pets = await Pet.findAll();
})();

// 考虑到koa的处理函数都是async函数，所以我们实际上将来在koa的async函数中直接写await访问数据库就可以了！

// 这也是为什么我们选择Sequelize的原因：只要API返回Promise，就可以用await调用，写代码就非常简单！



// ------- 实战 --------

// 在使用Sequlize操作数据库之前，我们先在MySQL中创建一个表来测试。
// 我们可以在test数据库中创建一个pets表。test数据库是MySQL安装后自动创建的用于测试的数据库。在MySQL命令行执行下列命令

grant all privileges on test.* to 'www'@'%' identified by 'www';

use test;

create table pets (
    id varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    birth varchar(10) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;

// 第一条grant命令是创建MySQL的用户名和口令，均为www，并赋予操作test数据库的所有权限。

// 第二条use命令把当前数据库切换为test。

// 第三条命令创建了pets表。



// 然后，我们根据前面的工程结构创建hello-sequelize工程，结构如下：
// hello-sequelize/
// |
// +- .vscode/
// |  |
// |  +- launch.json <-- VSCode 配置文件
// |
// +- init.txt <-- 初始化SQL命令
// |
// +- config.js <-- MySQL配置文件
// |
// +- app.js <-- 使用koa的js
// |
// +- package.json <-- 项目描述文件
// |
// +- node_modules/ <-- npm安装的所有依赖包

// 依赖 =====>
// 注意mysql是驱动，我们不直接使用，但是sequelize会用。
// "sequelize": "3.24.1",
// "mysql": "2.11.1"