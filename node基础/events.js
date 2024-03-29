/* 
件驱动、非阻塞IO是Node.js的特点，所以事件模块是非常重要的模块。
Node.js绝大多数模块都继承了events。
基于事件的编程是典型的发布 - 订阅模式的实现，有效地解耦了发布者和订阅者，
发布者只需要关心事件的触发，不需要关心触发之后的逻辑，
而订阅者只关注订阅，不需要关注事件是由谁来触发。 */

const Events = require('events')
const emitter = new Events

emitter.on('dada', function (param) {
    console.log(`${param}打人了`)
})

emitter.emit('dada', '张三')
emitter.emit('dada', '李四')