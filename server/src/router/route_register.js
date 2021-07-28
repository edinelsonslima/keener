const express = require("express");
const router = express.Router();
const { Register, Edited, Deleted } = require("../model");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Rota para listar todos os Registers
router.get("/full", async function (req, res) {
  const response = await Register.findAll();
  res.json(response);
});

router.get("/edited", async function (req, res) {
  const response = await Edited.findAll();
  res.json(response);
});

router.get("/deleted", async function (req, res) {
  const response = await Deleted.findAll();
  res.json(response);
});

module.exports = router;
