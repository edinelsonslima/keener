const Sequelize = require("sequelize");
const database = require("../services/db");

module.exports = database.define("editado", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_pd:{
      type: Sequelize.INTEGER,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preco: {
      type: Sequelize.DOUBLE,
    },
    descricao: {
      type: Sequelize.STRING,
    },
  });