

const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});

// 这样，User就具有email、passwd、name和gender这4个业务字段。id、createdAt、updatedAt和version应该自动加上，而不是每个Model都去重复定义。

// db.js的作用就是统一Model的定义