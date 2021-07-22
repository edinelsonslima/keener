//require app express
const app = require("./src/services/app");

//requires routers
const produto = require("./src/router/route_produto");

//MySQL
const db = require('./src/services/db')

//Rotas
app.use("/produto", produto);

//Iniciando servidor
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 8081!!!");
});

