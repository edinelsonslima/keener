require("dotenv/config");

//require app express
const app = require("./src/services/app");

//requires routers
const produto = require("./src/router/route_produto");
const registro = require("./src/router/route_register");
const login = require("./src/router/route_login");
const new_user = require("./src/router/route_user");

//MySQL
// require("./src/services/db");

// Verifica se esta logado
const jwt = require("jsonwebtoken");

function authenticationMiddleware(req, res, next) {
  const isAuthPass = req.isAuthenticated()
  const token = req.header("token");

  const isPassport = () => {
    if (isAuthPass) return true;
    return false
  };

  const isJWT = jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return false;
    return true;
  });

  if (isJWT && isPassport()) return next();
  return res.status(401).end();
}

//Rotas
app.use("/login", login);
app.use("/user", new_user);
app.use("/produto", authenticationMiddleware, produto);
app.use("/registro", authenticationMiddleware, registro);

//Iniciando servidor
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 8081!!!");
});
