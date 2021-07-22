const express = require("express");
const router = express.Router();
const {Produto} = require("../model/create_tables");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Rota para listar todos os produtos
router.get("/", function (req, res) {
  Produto.findAll().then((result) => res.json(result));
});

// Rota para buscar produto especifico
router.get("/:id", function (req, res) {
  Produto.findByPk(req.params.id).then((result) => {
    if (!result) return res.status(204).json();
    return res.json(result);
  });
});

// Rota para adicionar novo produto
router.post("/", function (req, res) {
  Produto
    .create({
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    })
    .then((result) => res.json(result));
});

//Rota put
router.put("/:id", function (req, res) {
  Produto.update(
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

  Produto.findByPk(req.params.id).then((result) => {
    if (!result) return res.status(204).json();
    return res.json(result);
  });
});

//Rota Delete
router.delete("/:id", function (req, res) {
  Produto.destroy({
    where: {
      id: req.params.id,
    },
  });

  Produto.findByPk(req.params.id).then((result) => {
    if (!result) return res.status(204).json();
    return res.json(result);
  });
});

module.exports = router;