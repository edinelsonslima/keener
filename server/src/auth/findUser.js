const database = require("../services/db");
const { User } = require("../model/create_tables");

async function findUser(username) {
  const user = await User.findAll({
    where: {
      user: username,
    },
  });
  return user;
}

async function findUserById(id) {
  const userId = await User.findByPk(id);
  return userId;
}

module.exports = { findUser, findUserById };
