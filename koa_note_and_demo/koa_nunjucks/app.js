
// 编写使用Nunjucks的函数render。查看Nunjucks的官方文档: http://mozilla.github.io/nunjucks/cn/getting-started.html

const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

// 变量env就表示Nunjucks模板引擎对象，它有一个render(view, model)方法，正好传入view和model两个参数，并返回字符串
// 创建env需要的参数可以查看文档获知。我们用autoescape = opts.autoescape && true这样的代码给每个参数加上默认值，
// 最后使用new nunjucks.FileSystemLoader('views')创建一个文件系统加载器，从views目录读取模板。


// 用下面的代码来渲染这个模板
// var s = env.render('hello.html', {name: '小明'});
// console.log(s);

// 和使用JavaScript模板字符串没啥区别嘛。不过，试试
// var s = env.render('hello.html', {name: '<script>alert("小明")</script>'});
// console.log(s);

// 输出： <h1>Hello &lt;script&gt;alert("小明")&lt;/script&gt;</h1>
// 这样避免了输出恶意脚本


// test
// var s = env.render('hello.html', {fruits: ['apple', 'banana']})
// console.log(s);


// Nunjucks模板引擎最强大的功能在于模板的继承。
// 仔细观察各种网站可以发现，网站的结构实际上是类似的，头部、尾部都是固定格式，只有中间页面部分内容不同。如果每个模板都重复头尾，一旦要修改头部或尾部，那就需要改动所有模板。

// 因此，更好的方式是使用继承。先定义一个基本的网页框架base.html
// base.html定义了三个可编辑的块，分别命名为header、body和footer。子模板可以有选择地对块进行重新定义

// 然后，对子模板进行渲染
var s = env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla baa...'
})
console.log(s);



// ------------------------ numjucks性能 -----------------------------
// 性能

// 最后我们要考虑一下Nunjucks的性能。

// 对于模板渲染本身来说，速度是非常非常快的，因为就是拼字符串嘛，纯CPU操作。

// 性能问题主要出现在从文件读取模板内容这一步。这是一个IO操作，在Node.js环境中，我们知道，单线程的JavaScript最不能忍受的就是同步IO，但Nunjucks默认就使用同步IO读取模板文件。

// 好消息是Nunjucks会缓存已读取的文件内容，也就是说，模板文件最多读取一次，就会放在内存中，后面的请求是不会再次读取文件的，只要我们指定了noCache: false这个参数。

// 在开发环境下，可以关闭cache，这样每次重新加载模板，便于实时修改模板。在生产环境下，一定要打开cache，这样就不会有性能问题。

// Nunjucks也提供了异步读取的方式，但是这样写起来很麻烦，有简单的写法我们就不会考虑复杂的写法。保持代码简单是可维护性的关键。