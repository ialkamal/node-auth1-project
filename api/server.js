const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./users/users-router");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const sessionConfig = {
  name: "monkey",
  secret: "keep it simple, keep it dark.",
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    knex: require("../data/knexConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60 * 60 * 1000,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
