

const Koa = require('koa')

// 实例化应用
const app = new Koa();

/* 中间件

编写Koa应用的时候没有使用路由这一概念，而是使用了中间件概念。

Koa核心不捆绑任何中间件，因此路由功能是没有的，也就是说不能根据请求路径和请求方法来返回不同的响应。
 */

// koa中需要配置Cookie签名密钥才能使用Cookie功能，否则将报错。
app.keys = ['signedKey']

app.use(async (ctx) => {
    // ctx.cookies.get()建议传递signed选项来验证签名，否则cookie将有篡改风险。
    const logged = ctx.cookies.get('logged', { signed: true });
    ctx.body = logged;
});

// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
});