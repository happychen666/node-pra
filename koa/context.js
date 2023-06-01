const Koa = require('koa')

// 实例化应用
const app = new Koa();

/* 中间件

编写Koa应用的时候没有使用路由这一概念，而是使用了中间件概念。

Koa核心不捆绑任何中间件，因此路由功能是没有的，也就是说不能根据请求路径和请求方法来返回不同的响应。
 */
app.use(async (ctx) => {
    ctx.set('x-version', '1.0.0');
    ctx.body = {
        method: ctx.method,
        path: ctx.path,
        url: ctx.url,
        query: ctx.query,
        headers: ctx.headers,
        ip: ctx.ip
    };
})

// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
})