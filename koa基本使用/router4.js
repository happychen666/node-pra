// 导入模块
const Koa = require("koa");
const Router = require("koa-router"); // 实例化应用

const app = new Koa(); // 实例化路由
const router = new Router(); // 路由定义
/* Koa默认的中间件是应用级别的，所有的请求都会被中间件处理。由于koa-router也支持多个路由函数，因此可以在指定路由或者整个路由对象上使用中间件。
以下是整个路由对象启用中间件的示例。 */

// 日志中间件
async function logger(ctx, next) {
  console.log(`${ctx.method} ${ctx.path} ${ctx.headers["user-agent"]}`);
  await next();
}

// router.use(logger); //整个路由使用中间件
// router.get("/", (ctx) => {
//   ctx.body = "home";
// });

//指定路由使用中间件
router.get("/", logger, (ctx) => {
  ctx.body = "home";
});

router.get("/user", (ctx) => {
  ctx.body = "user";
});

/* 挂载路由中间件
一定不要忘记通过app.use()挂载路由中间件，否则路由将不会生效 */
app.use(router.routes());
app.use(router.allowedMethods());

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
