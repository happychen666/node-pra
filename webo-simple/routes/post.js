const Router = require("koa-router");
const postService = require("../services/post");
const router = new Router();

// get请求数据到 发布表单页
router.get("/publish", async (ctx) => {
  await ctx.render("publish");
});

// 在发布页面编辑后 post请求编辑后的数据，发布新的文章
router.post("/publish", async (ctx) => {
  const data = ctx.request.body;
  if (!data.title || !data.content) {
    ctx.throw(400, "您的请求有误");
  }
  const item = postService.publish(data.title, data.content);
  ctx.redirect(`/detail/${item.id}`);
});

// get请求数据填充到 编辑文章
router.get("/update/:postId", async (ctx) => {
  const post = postService.show(ctx.params.postId);
  if (!post) {
    ctx.throw(404, "文章不存在");
  }
  await ctx.render("update", { post });
});

// 在编辑文章页面编辑完以后点击发布重新 post请求编辑后的数据，
// 提交成功又跳转到detail页面
router.post("/update/:postId", async (ctx) => {
  const data = ctx.request.body;
  if (!data.title || !data.content) {
    ctx.throw(400, "您的请求有误");
  }
  const postId = ctx.params.postId;
  postService.update(postId, data.title, data.content);
  ctx.redirect(`/detail/${postId}`);
});

// 查看文章详情
router.get("/detail/:postId", async (ctx) => {
  const post = postService.show(ctx.params.postId);
  if (!post) {
    ctx.throw(404, "文章不存在");
  }
  await ctx.render("detail", { post: post });
});

// 删除
router.get("/delete/:postId", async (ctx) => {
  postService.delete(ctx.params.postId);
  ctx.redirect("/");
});
module.exports = router;
