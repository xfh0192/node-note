// ------------- 进行重构 ---------------
// url2-koa/
// |
// +- .vscode/
// |  |
// |  +- launch.json <-- VSCode 配置文件
// |
// +- controllers/
// |  |
// |  +- login.js <-- 处理login相关URL
// |  |
// |  +- users.js <-- 处理用户管理相关URL
// |
// +- app.js <-- 使用koa的js
// |
// +- package.json <-- 项目描述文件
// |
// +- node_modules/ <-- npm安装的所有依赖包

// 现在，我们修改app.js，让它自动扫描controllers目录，找到所有js文件，导入，然后注册每个URL

// 先导入 fs 模块，然后用 readdirSync 列出文件
// 这里可以用 sync 是因为启动时只运行一次，不存在性能问题
// var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件
// var fs_files = files.filter((f)=>{
//     return f.endsWith('.js');
// })

// 处理每个js文件
// for (var f of js_files) {
//     console.log(`process controller: ${f}...`);
//     // 导入js文件
//     let mapping = require(__dirname + '/controllers' + f);
//     for (var url in mapping) {
//         if (url.startsWith('GET ')) {
//             // 如果url类似’GET xxxx‘
//             var path = url.substring(4);
//             router.get(path, mapping[url]);
//             console.log(`register URL mapping: GET ${path}`);
//         } else if (url.startsWith('POST ')) {
//             // 如果URL类似'POST xxx'
//             var path = url.substring(5);
//             router.post(path, mapping[url]);
//             console.log(`register URL mapping: POST ${path}`);
//         } else {
//             // 无效的url
//             console.log(`invalid URL: ${url}`);
//         }
//     }
// }

// function addMapping(router, mapping){
//     for (var url in mapping) {
//         if (url.startswith('GET ')) {
//             var path = url.substring(4);
//             router.get(path, mapping[url]);
//             console.log(`register URL mapping: GET ${path}`);
//         } else if (url.startsWith('POST ')) {
//             // 如果URL类似'POST xxx'
//             var path = url.substring(5);
//             router.post(path, mapping[url]);
//             console.log(`register URL mapping: POST ${path}`);
//         } else {
//             // 无效的url
//             console.log(`invalid URL: ${url}`);
//         }
//     }
// }

// function addControllers(router) {
//     var files = fs.readdirSync(__dirname + '/controllers');
//     var js_files = files.filter((f) => {
//         return f.endsWith('.js');
//     })

//     for (var f of js_files) {
//         console.log(`process controller: ${f}...`);
//         let mapping = require(__dirname + '/controllers/' + f);
//         addMapping(router, mapping);
//     }
// };

// addControllers(router);

// controller middleware
// 最后，我们把扫描controllers目录和创建router的代码从app.js中提取出来，
// 作为一个简单的middleware使用，命名为controller.js

const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyParser');

const app = new Koa();
app.use(bodyParser());
// 导入controller middleware:
const controller = require('./controller');
// 使用middleware:
app.use(controller());

app.listen(3000);
console.log('server starts at port 3000...')

