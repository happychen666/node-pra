// 导入模块
const Koa = require("koa");
const Router = require("koa-router"); // 实例化应用

const app = new Koa(); // 实例化路由
const router = new Router(); // 路由定义

// 以下路由路径会将请求匹配到根路由/：
// router.get("/", (ctx) => {
//   ctx.body = "Home";
// });

// koa-router的路由函数和Koa默认的路由函数是相似的，也支持多个路由函数处理同一个请求。但是ctx.params只有koa-router的路由函数才可以访问。
router.get(
  "/",
  async (ctx, next) => {
    ctx.state.data = { logged: true };
    await next();
  },
  (ctx) => {
    ctx.body = ctx.state.data;
  }
);

// 以下路由路径会将请求匹配到/about：
router.get("/about", (ctx) => {
  ctx.body = "关于";
});

// 以下路由路径可以将请求匹配到/random.txt文件：
router.get("/random.txt", (ctx) => {
  ctx.body = "random.txt";
});

// 以下是一些基于字符串模式的示例。
// 以下路由路径可以匹配/users/xxx，匹配成功后xxx将挂载到ctx.params变量下：
router.get("/users/:userId", (ctx) => {
  ctx.body = { userId: ctx.params.userId };
});

/* 挂载路由中间件
一定不要忘记通过app.use()挂载路由中间件，否则路由将不会生效 */
app.use(router.routes());
app.use(router.allowedMethods());

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
