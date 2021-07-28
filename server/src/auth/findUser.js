require("../services/db");
const { User } = require("../model");
const { QueryTypes } = require("sequelize");

async function findUser(username) {
  const user = await User.sequelize.query(
    `SELECT * FROM users WHERE user = '${username}'`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return user;
}

async function findUserById(id) {
  const userId = await User.findByPk(id);
  return userId;
}

module.exports = { findUser, findUserById };
