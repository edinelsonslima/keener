const express = require("express");
const router = express.Router();
const { User } = require("../model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Rota para listar todos os Users
router.get("/", async function (req, res) {
  const response = await User.findAll();
  res.json(response);
});

// Rota para buscar User especifico
router.get("/:id", async function (req, res) {
  const responseId = await User.findAll({
    where: { id: req.params.id },
  });

  const responseUser = await User.findAll({
    where: { user: req.params.id },
  });

  const responsePass = await User.findAll({
    where: { password: req.params.id },
  });

  const responseEmail = await User.findAll({
    where: { email: req.params.id },
  });

  if (responsePass.length > 0) return res.json(responsePass);
  if (responseId.length > 0) return res.json(responseId);
  if (responseUser.length > 0) return res.json(responseUser);
  if (responseEmail.length > 0) return res.json(responseEmail);

  if (
    responsePass.length === 0 &&
    responseUser.length === 0 &&
    responseEmail.length === 0 &&
    responseId.length === 0
  )
    return res.status(404).json(responseId);
});

// Rota para adicionar novo User
router.post("/", async function (req, res) {
  const pass = await bcrypt.hash(req.body.password, saltRounds);

  const response = await User.create({
    user: req.body.user,
    password: pass,
    email: req.body.email,
  });
  res.json(response);
});

//Rota put
router.put("/:id", async function (req, res) {
  const pass = await bcrypt.hash(req.body.password, saltRounds);

  await User.update(
    {
      user: req.body.user,
      password: pass,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  const response = await User.findByPk(req.params.id);
  if (!response) return res.status(204).json();
  return res.json(response);
});

//Rota Delete
router.delete("/:id", async function (req, res) {
  const response = await User.findByPk(req.params.id);
  if (!response) return res.send(false).status(404);

  await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  const responseDel = await User.findByPk(req.params.id);
  if (!responseDel) return res.send(true);
  return res.json(responseDel).status(404);
});

module.exports = router;
