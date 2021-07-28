const express = require("express");
const router = express.Router();
const { Product } = require("../model");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Rota para listar todos os produtos
router.get("/", async function (req, res) {
  const response = await Product.findAll();
  res.json(response);
});

// Rota para buscar produto especifico
router.get("/:id", async function (req, res) {
  const responseId = await Product.findAll({
    where: { id: req.params.id },
  });

  const responseNome = await Product.findAll({
    where: { nome: req.params.id },
  });

  const responsePreco = await Product.findAll({
    where: { preco: req.params.id },
  });

  const responseDesc = await Product.findAll({
    where: { descricao: req.params.id },
  });

  if (responsePreco.length > 0) return res.json(responsePreco);
  if (responseId.length > 0) return res.json(responseId);
  if (responseNome.length > 0) return res.json(responseNome);
  if (responseDesc.length > 0) return res.json(responseDesc);

  if (
    responsePreco.length === 0 &&
    responseNome.length === 0 &&
    responseDesc.length === 0 &&
    responseId.length === 0
  )
    return res.status(404).json(responseId);
});

// Rota para adicionar novo produto
router.post("/", async function (req, res) {
  const response = await Product.create({
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
  });
  res.json(response);
});

//Rota put
router.put("/:id", async function (req, res) {
  await Product.update(
    {
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  const response = await Product.findByPk(req.params.id);
  if (!response) return res.status(204).json();
  return res.json(response);
});

//Rota Delete
router.delete("/:id", async function (req, res) {
  const response = await Product.findByPk(req.params.id)
  if(!response) return res.send(false).status(400)

  await Product.destroy({
    where: {
      id: req.params.id,
    },
  });

  const responseDel = await Product.findByPk(req.params.id);
  if (!responseDel) return res.send(true);
  return res.json(responseDel).status(404);
});

module.exports = router;
