const express = require("express");
const router = express.Router();
const passport = require("passport");

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log("Time: ", Date.now());
//   next();
// });

//Retorna uma mensagem de erro
router.get("/", (req, res, next) => {
  if (req.query.fail)
    res.json({
      login: "login",
      message: "Usuário e/ou senha incorretos!",
    });
  else
    res.json({
      login: "login",
      message: null,
    });
});

//Pega as informações de login
router.post("/", passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/login?fail=true",
  })
)

module.exports = router;