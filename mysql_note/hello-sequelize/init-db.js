
require('babel-core/register')({
    presets: ['stage-3']
});

const model = require('./model.js');
model.sync();

console.log('init db ok.');
process.exit(0);

// 它最大的好处是避免了手动维护一个SQL脚本。