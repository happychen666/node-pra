// 路由前缀可以将同一个模块的路由聚合在一起，提供一个统一的URL前缀供客户端访问。
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();

const router = new Router({
  prefix: "/user",
});

router.get("/", (ctx) => {
  ctx.body = "/user";
});

router.get("/list", (ctx) => {
  ctx.body = "user/list";
});

app.use(router.routes()).use(router.allowedMethods());

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
