// 配置sequelize
const { Sequelize, Model, DataTypes } = require("sequelize");

// 数据库连接配置
const sequelize = new Sequelize({
  dialect: "mysql", //底层数据库。支持MySQL、PostgreSQL、MS SQL、MariaDB（MySQL的一个分支）和Sqlite。
  host: "localhost", //数据库连接地址。默认值为localhost。
  port: 3306, //数据库连接端口。
  username: "root", //数据库账号。
  password: "123456",
  database: "test", //mysql中建的数据库名称
  timezone: "+08:00",
  pool: { max: 10, min: 0 }, //连接池选项
  logging: false, //是否显示SQL日志。默认值为true。
});

/* 定义模型需要两步：
（1）继承Sequelize内置的Model。
（2）使用init方法初始化模型字段和模型选项。 */

// 定义User模型(可以理解成数据库里面的一张表)
class User extends Model {}
User.init(
  // 字段设置（表里面的字段）
  {
    id: {
      type: DataTypes.INTEGER({ unsigned: true }), //数据类型
      primaryKey: true, //是否主键
      autoIncrement: true, //是否自增
      comment: "用户ID", //字段注释
    },
    username: {
      type: DataTypes.STRING(40),
      unique: true, //是否唯一索引
      allowNull: false,
      comment: "账号",
    },
    password: { type: DataTypes.CHAR(64), allowNull: false, comment: "密码" },
  },
  // 模型选项设置
  { sequelize: sequelize, tableName: "user", modelName: "user" }
);
//使用sequelize.sync()将模型同步到数据库（自动建表）
sequelize
  .sync()
  .then(() => {
    // 插入了一条用户数据
    return User.create({
      username: "xialei",
      password: "password",
    });
  })
  .then((user) => {
    console.log(user.toJSON());
  })
  .catch((err) => {
    console.error(err);
  });
