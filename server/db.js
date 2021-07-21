require('dotenv/config')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_SENHA,
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

console.log(process.env.MYSQL_USER)

module.exports = sequelize