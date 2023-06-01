// 导入模块
const Koa = require("koa");

// 实例化应用
const app = new Koa();

// 日志中间件

/* 在logger中，
我们在调用next()之前记录当前请求时间，
调用next()后logger将不再执行，直接执行下一个中间件。
下一个中间件就是我们的路由了，路由执行完毕后，再来执行logger中间件next()之后的代码。 */
async function logger(ctx, next) {
  const start = Date.now();
  await next();

  // 将控制权交给下一个中间件
  console.log(
    `${ctx.method} ${ctx.path} "${ctx.headers["user-agent"]} " ${
      Date.now() - start
    }ms`
  );
}
app.use(logger);

// “路由”
app.use(async (ctx) => {
  ctx.body = "Hello World";
});

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
