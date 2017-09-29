// ------------------------- 集成Numjucks ---------------------------------

// 集成Nunjucks实际上也是编写一个middleware，这个middleware的作用是给ctx对象绑定一个render(view, model)的方法，
// 这样，后面的Controller就可以调用这个方法来渲染模板了。我们创建一个templating.js来实现这个middleware：

const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnundefined = opts.throwOnundefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnundefined
            }
        );
    
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建新nunjucks的env对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数
        ctx.render = function(view, model) {
            // 把render后的内容赋值给response.body
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type
            ctx.response.type = 'text/html';
        };
        // 继续处理请求
        await next(); 
    }
}

module.exports = templating;


// 注意到createEnv()函数和前面使用Nunjucks时编写的函数是一模一样的。
// 我们主要关心tempating()函数，它会返回一个middleware，在这个middleware中，我们只给ctx“安装”了一个render()函数，其他什么事情也没干，就继续调用下一个middleware。、

// 使用的时候，我们在app.js添加如下代码：
// const isProduction = process.env.NODE_ENV === 'production';

// app.use(templating('view', {
//     noCache: !isProduction,
//     watch: !isProduction
// }));