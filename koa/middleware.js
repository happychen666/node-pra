// 导入模块
const Koa = require("koa");

// 实例化应用
const app = new Koa();

/* 
一般的中间件会执行两次，调用next之前为第一次，也就是“洋葱左半边”这一部分，从外层向内层依次执行。当后续没有中间件时，就进入响应流程，也就是“洋葱右半边”这一部分，从内层向外层依次执行，这是第二次执行
 */
async function middleware1(ctx, next) {
  console.log("middleware1 start");
  await next();
  console.log("middlware1 end");
}

async function middleware2(ctx, next) {
  console.log("middleware2 start");
  await next();
  console.log("middlware2 end");
}

// 中间件
app.use(middleware1);
app.use(middleware2);

// 路由
app.use(async (ctx) => {
  console.log("router");
  ctx.body = "Hello World";
});

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
