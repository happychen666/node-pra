// 导入模块
const Koa = require("koa");

// 实例化应用
const app = new Koa();

// 以通过“函数返回一个新函数”来编写可配置的中间件。
function logger(options) {
  // 选项
  return async function (ctx, next) {
    // 真正的中间件
    const start = Date.now();
    await next();
    const parts = [];
    options.method && parts.push(ctx.method);
    options.path && parts.push(ctx.path);
    options.userAgent && parts.push(ctx.headers["user-agent"]);
    parts.push(`${Date.now() - start} ms`);
    console.log(parts.join(" "));
  };
}

// 挂载中间件并传递选项
app.use(logger({ method: true, path: true }));

// app.use(logger);

// “路由”
app.use(async (ctx) => {
  ctx.body = "Hello World";
});

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
