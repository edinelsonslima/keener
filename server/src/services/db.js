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
require("../model");

//Cirando os Triggers
const {
  TRG_register,
  TRG_edited,
  TRG_deleted,
  Exits,
} = require("./db_query");

const response = database.query(Exits);

setTimeout(() => {
  response.then((verify) => {
    if (verify[0].length == 0) {
      database.query(TRG_register);
      database.query(TRG_edited);
      database.query(TRG_deleted);
    }
  });
}, 500)

// Sincroniza o banco de dados e trata
try {
  database.sync();
  console.log("Database sincronizado com sucesso");
} catch (error) {
  console.log("House o seguinte erro na sincronização: \n" + error);
}

module.exports = database;
