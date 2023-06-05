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

class User extends Model {
  //可以直接在模型类中添加静态方法和实例方法。
  getFullName() {
    return this.lastname + this.firstname;
    // this代表User实例，也就是一行数据记录
  }
  static checkName(name) {
    // 静态方法，通过User.checkName(name)调用
    return true;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER({ unsigned: true }),
      primaryKey: true,
      autoIncrement: true,
      comment: "用户ID",
    },
    firstname: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: { msg: "名不能为空" },
      },
    },
    lastname: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: { msg: "姓不能为空" },
      },
    },
  },
  {
    sequelize: sequelize,
    tableName: "user",
    modelName: "user",
    paranoid: true,
    underscored: true,
  }
);

sequelize
  .sync({ force: true })
  .then(() => {
    return User.create({
      firstname: "san",
      lastname: "zhang",
    });
  })
  .then((user) => console.log(user.getFullName())) // 输出“zhangsan”
  .catch((err) => console.error(err));
