
// 处理首页 GET /
async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

// koa并没有在ctx对象上提供render方法，这里我们假设应该这么使用，这样，我们在编写Controller的时候，最后一步调用ctx.render(view, model)就完成了页面输出

async (ctx, next) => {
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {
        // 登陆成功
        ctx.render()
    }
}