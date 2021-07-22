require("dotenv/config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_SENHA,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o database estabelecida sucesso.");
  })
  .catch((err) => {
    console.error("Houve o seguinte erro na conexão: \n", err);
  });

const modelProduto = require("../model/model_produto");
try {
  sequelize.sync();
  console.log("Database sincronizado com sucesso");
} catch (error) {
  console.log("House o seguinte erro na sincronização: \n" + error);
}

module.exports = sequelize;
