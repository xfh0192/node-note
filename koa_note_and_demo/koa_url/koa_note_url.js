// ------------------------------ 处理url ------------------------------------------

// 在hello-koa工程中，我们处理http请求一律返回相同的HTML，这样虽然非常简单，但是用浏览器一测，随便输入任何URL都会返回相同的网页
// 但是正常情况下，我们应该对不同的URL调用不同的处理函数，这样才能返回不同的结果。例如像这样写:
// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/'){
//         ctx.response.body = 'index page';
//     } else {
//         await next();
//     }
// });

// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/test'){
//         ctx.response.body = 'TEST page';
//     } else {
//         await next();
//     }
// });
// ......
// 这么写是可行的，但是有点蠢。。。。
// 应该有一个能集中处理URL的middleware，它根据不同的URL调用不同的处理函数，这样，我们才能专心为每个URL编写处理函数

// ------------------------------ koa-router ------------------------------------------
// 为了处理URL，我们需要引入 koa-router 这个middleware，让它负责处理URL映射
// 依赖项 =>  "koa-router": "7.0.0"

// 使用 koa-router 处理url：
// const Koa = require('koa');

// // 注意 require('koa-router') 返回的是函数
// const router = require('koa-router')();

// const app = new Koa();

// // log request URL:
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request}`)
//     await next();
// });

// // add url-route:
// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });

// router.get('/', async (ctx, next) => {
//     ctx.response.body = '<h1>Index</h1>';
// });

// // add router middleware
// app.use(router.routes());

// app.listen(3000);
// console.log('app started at port 3000....');
// 注意导入koa-router的语句最后的()是函数调用：
// 相当于： const fn_router = require('koa');
//         const router = fn_router();

// 然后，我们使用router.get('/path', async fn)来注册一个GET请求。
// 可以在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问。
// 再运行app.js，我们就可以测试不同的URL


// ------------------------------ 处理post请求 ------------------------------------
// 处理post，用 router.post('/path', async fn)
// 用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，或者JSON，
// 它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！

// 所以，我们又需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
// ===> koa-bodyparser
// "koa-bodyparser": "3.2.0"

// const Koa = require('koa');

// const router = require('koa-router')();

// const app = new Koa();

// const bodyParser = require('koa-bodyparser');  // 引入koa-bodyparser

// // 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
// app.use(bodyParser());

// // log request URL:
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request}`)
//     await next();
// });

// // ！！！现在我们可以处理 post 请求了，写一个简单的登录表单
// router.get('/', async (ctx, next) => {
//     ctx.response.body = `<h1>Index</h1>
//                         <form action="/signin" method="post">
//                             <p>Name: <input name="name" value="koa"></p>
//                             <p>Password: <input name="password" type="password"></p>
//                             <p><input type="submit" value="Submit"></p>
//                         </form>`
// })

// router.post('/signin', async (ctx, next) => {
//     var name = ctx.request.body.name || '',
//         password = ctx.request.body.password || '';
//     console.log(`signin with name: ${name}, password: ${password}`);
//     if(name == 'koa' && password == '12345'){
//         ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//     } else {
//         ctx.response.body = `<h1>Login failed!</h1>
//                             <p>
//                                 <a href="/">Try again</a>
//                             </p>`
//     }
// })

// // add router middleware
// app.use(router.routes());

// app.listen(3000);
// console.log('app started at port 3000....');

// 注意到我们用var name = ctx.request.body.name || ''拿到表单的name字段，如果该字段不存在，默认值设置为''。
// 类似的，put、delete、head请求也可以由router处理。


// ------------------- 重构 -----------------------
// 复制一份为 koa_url2