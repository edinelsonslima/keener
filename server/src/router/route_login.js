const { findUser } = require("../auth/findUser.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
require("dotenv/config");

//Pega as informações de login
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login?fail=true",
  }),
  async (req, res) => {
    const user = await findUser(req.body.user);
    if (user.length <= 0) return res.status(401).end();

    const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_TOKEN, {
      expiresIn: 300,
    });
    return res.json({ auth: true, token: token, user: user[0].id });
  }
);

module.exports = router;
