const express = require("express");
const router = express.Router();
const { Produto } = require("../model/create_tables");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Rota para listar todos os produtos
router.get("/", async function (req, res) {
  const response = await Produto.findAll();
  res.json(response);
});

// Rota para buscar produto especifico
router.get("/:id", async function (req, res) {
  const responseId = await Produto.findAll({
    where: { id: req.params.id },
  });

  const responseNome = await Produto.findAll({
    where: { nome: req.params.id },
  });

  const responsePreco = await Produto.findAll({
    where: { preco: req.params.id },
  });

  const responseDesc = await Produto.findAll({
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
  const response = await Produto.create({
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
  });
  res.json(response);
});

//Rota put
router.put("/:id", async function (req, res) {
  await Produto.update(
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

  const response = await Produto.findByPk(req.params.id);
  if (!response) return res.status(204).json();
  return res.json(response);
});

//Rota Delete
router.delete("/:id", async function (req, res) {
  const response = await Produto.findByPk(req.params.id)
  if(!response) return res.send(false).status(400)

  await Produto.destroy({
    where: {
      id: req.params.id,
    },
  });

  const responseDel = await Produto.findByPk(req.params.id);
  if (!responseDel) return res.send(true);
  return res.json(responseDel).status(404);
});

module.exports = router;
