// 认证中间件，负责解析cookie，将登录状态挂载到ctx.state上，供后续使用。
module.exports = async function (ctx, next) {
  const logged = ctx.cookies.get("logged", {
    signed: true,
  });
  ctx.state.logged = !!logged;
  await next();
};
