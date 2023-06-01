// 导入模块
const Koa = require("koa");
// const Router = require("koa-router");
// 实例化应用
const app = new Koa();

app.use(async (ctx, next) => {
  //路由函数1
  ctx.body = "1";
  await next();
});

// 如果将路由函数1中的代码修改一下，将“1”输出到浏览器：
/* 因为Koa的中间件是 洋葱圈模型，所以先执行路由函数1，执行到next()后，进入路由函数2的执行，路由函数2设置了ctx.body为“2”，此时没有后续路由函数，执行流程将回到路由函数1，而此时路由函数1将ctx.body设置为“1”，所以浏览器最终显示“1”。 */
// app.use(async (ctx, next) => {
//   await next();
//   ctx.body = "1";
// });

app.use((ctx) => {
  // 路由函数2
  ctx.body = "2";
});

// 监听
app.listen(10000, () => {
  console.log("listen on 10000");
});
