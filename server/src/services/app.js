const express = require("express");
const app = express();
require("dotenv/config");

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//express-session
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
app.use(
  session({
    store: new MySQLStore({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 100 },//30 min
  })
);

//Passport
const passport = require("passport");
require("../auth/auth")(passport);
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
