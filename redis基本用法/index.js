const redis = require('redis') // 引入 redis

const redisClient = redis.createClient() // 创建客户端

// 监听错误信息
redisClient.on('err', err => {
    console.log('redis client error: ', err)
})

// 连接
redisClient.connect(6379, '127.0.0.1')

redisClient.set('name', 'gagg', redis.print)

redisClient.get('name', (err, val) => {
    if (err) {
        console.error(err)
        return
    }
}).then(val => {
    console.log('gggggg====', val)
})


redisClient.HSET('test', {
    name: 'fffff',
    age: '222'
})

redisClient.hGetAll('test').then(val => {
    console.log('oooooo====', val);
})