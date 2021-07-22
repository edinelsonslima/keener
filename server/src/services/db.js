require("dotenv/config");
const Sequelize = require("sequelize");

//Conexão com o MYSQL pelo Sequelize
const database = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

//Verifica Algum erro na Autenticação do banco
database
  .authenticate()
  .then(() => {
    console.log("Conexão com o database estabelecida sucesso.");
  })
  .catch((err) => {
    console.error("Houve o seguinte erro na conexão: \n", err);
  });

//Inicializa o models para criar a table caso não exista
require("../model/create_tables");

//Sincroniza o banco de dados e trata
try {
  database.sync();
  console.log("Database sincronizado com sucesso");
} catch (error) {
  console.log("House o seguinte erro na sincronização: \n" + error);
}

module.exports = database