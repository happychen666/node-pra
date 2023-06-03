const fs = require("fs");
const bluebird = require("bluebird");

// Promise化fs的API
bluebird.promisifyAll(fs);

// 文章数据
const posts = [];

// 文章ID
let postId = 1;

// 发表文章
exports.publish = function (title, content) {
  const item = {
    id: postId++,
    title: title,
    content: content,
    time: new Date().toLocaleString(),
  };
  posts.push(item);
  return item;
};

// 查询文章信息
exports.show = function (id) {
  id = Number(id);
  for (const post of posts) {
    if (post.id === id) {
      return post;
    }
  }
  return null;
};
// 编辑文章
exports.update = function (id, title, content) {
  id = Number(id);
  posts.forEach((post) => {
    if (post.id === id) {
      post.title = title;
      post.content = content;
    }
  });
};
// 删除文章
exports.delete = function (id) {
  id = Number(id);
  let index = -1;
  posts.forEach((post, i) => {
    if (post.id === id) {
      index = i;
    }
  });
  if (index > -1) {
    posts.splice(index, 1);
  }
};
// 文章列表
exports.list = function () {
  const test = posts.map((item) => item);
  // console.log("posts===", posts);
  // console.log("test===", test);
  return test;
};
