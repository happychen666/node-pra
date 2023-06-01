// 导入模块
const Koa = require("koa");

// 实例化应用
const app = new Koa();

// 日志中间件
async function cookieParser(ctx, next) {
  const headerCookie = ctx.headers.cookie;
  // 挂载到ctx.state中，然后在路由中间件使用
  ctx.state.cookies = {};
  if (headerCookie) {
    const cookies = headerCookie.split(";");
    cookies.forEach((cookie) => {
      const parts = cookie.split("=");
      ctx.state.cookies[parts[0]] = parts[1]; // 挂载到ctx.state.cookies下
    });
  }
  await next();
}
app.use(cookieParser);

// 路由
app.use(async (ctx) => {
  // 自定义的数据挂载到ctx.state下后再使用
  ctx.body = ctx.state.cookies;
});

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
