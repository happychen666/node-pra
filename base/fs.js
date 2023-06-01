/* 用来操作系统文件的模块 */
const fs = require('fs')

// 读取文件
fs.readFile('./fs.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('读取失败', err);
        return;
    }
    console.log('读取成功', data);
})

// 调用fs.writeFile()可以写入文件
fs.writeFile('./app.log',
    (new Date()).toString(),
    { encoding: 'utf8' },
    (err) => {
        if (err) {
            console.log('写入失败', err); return;
        } console.log('写入成功');
    })

// 如果文件存在时不需要覆盖，可以调用fs.appendFile()来追加文件内容
fs.appendFile('./app.log',
    (new Date()).toString(),
    { encoding: 'utf8' },
    (err) => {
        if (err) {
            console.log('写入失败', err); return;
        }
        console.log('写入成功');
    });

// 删除文件
// fs.unlink函数不能删除文件夹，需要调用fs.rmdir()才可以删除文件夹。
fs.unlink('./aaa', (err) => {
    if (err) {
        console.log('删除失败', err);
        return;
    }
    console.log('删除成功');
})