const Koa = require('koa');
const render = require('koa-ejs');

const app = new Koa();

render(app, {
    // 使用ejs中间件
    root: './templates',   // 模板目录  
    // layout: false, // 关闭模板布局 (关闭上中下或左中右这种布局)
    layout: 'main', // 开启模板布局 (关闭上中下或左中右这种布局)
    viewExt: 'ejs'
});

app.use(async (ctx) => {
    ctx.state.name = 'xialei';  // ctx.state挂载数据   
    await ctx.render('home', {
        now: (new Date()).toLocaleString(),
        title: '首页'
    });
});

// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
});
