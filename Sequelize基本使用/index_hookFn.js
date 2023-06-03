// 配置sequelize
const { Sequelize, Model, DataTypes } = require("sequelize");
let crypto = require("crypto");

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
  {
    // 字段设置（表里面的字段）
    id: {
      type: DataTypes.INTEGER({ unsigned: true }),
      primaryKey: true,
      autoIncrement: true,
      comment: "用户ID",
    },
    username: DataTypes.STRING(40),
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: "密码",
    },
  },
  // 模型选项设置
  {
    sequelize: sequelize,
    tableName: "user",
    modelName: "user",
    paranoid: true,
    hooks: {
      //   beforeSave钩子对密码加密
      beforeSave(user) {
        // 使用user.changed('password')来判断当前user的password是否有更改,如果产生更改，则需要对新密码进行加密。
        if (user.changed("password")) {
          user.password = crypto
            .createHash("sha256")
            .update(user.password)
            .digest("hex");
        }
      },
    },
  }
);
//使用sequelize.sync()将模型同步到数据库（自动建表）
sequelize
  .sync()
  .then(() => {
    // 插入了一条用户数据
    return User.create({
      username: "chenqun",
      password: "password",
    });
  })
  .then((user) => {
    console.log(user.toJSON());
  })
  .catch((err) => {
    console.error(err);
  });
