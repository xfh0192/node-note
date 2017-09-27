//---- 历史 ----

// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501579966ab03decb0dd246e1a6799dd653a15e1b000
// 第一代流行的web框架的express，对node的http进行封装
// 但是是基于es5语法，而且要实现异步代码，只能通过回调，如果嵌套层数过多，代码就进入回调地狱
// -----  express写法 ----
// app.get('/test', function (req, res) {
//     fs.readFile('/file1', function (err, data) {
//         if (err) {
//             res.status(500).send('read file1 error');
//         }
//         fs.readFile('/file2', function (err, data) {
//             if (err) {
//                 res.status(500).send('read file2 error');
//             }
//             res.type('text/plain');
//             res.send(data);
//         });
//     });
// });

// koa2 完全使用promise并配合async实现异步