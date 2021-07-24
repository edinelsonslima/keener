require("dotenv/config");

//require app express
const app = require("./src/services/app");

//requires routers
const produto = require("./src/router/route_produto");
const login = require("./src/router/route_login");

//MySQL
const db = require("./src/services/db");

//Verifica se esta logado
function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login?fail=true");
}

//Verifica se esta token JWT
const jwt = require("jsonwebtoken");
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(401).end();

    req.userId = decoded.userId;
    next();
  });
}

//Rotas
app.use("/login", login);
app.use("/produto", authenticationMiddleware, produto);

//Iniciando servidor
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 8081!!!");
});
