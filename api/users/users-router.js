const Users = require("./users-model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const checkLogin = require("./check-login");

router.get("/users", checkLogin, (req, res) => {
  Users.find()
    .then((users) => {
      const savedUsers = users.map((user) => ({
        id: user.id,
        username: user.username,
      }));
      res.status(200).json(savedUsers);
    })
    .catch((err) =>
      res.status(500).json({ message: "Failed to get users", error: err })
    );
});

router.post("/register", (req, res) => {
  const user = req.body;

  const password = bcrypt.hashSync(user.password, 10);

  Users.add({ username: user.username, password })
    .then((id) => {
      res.status(201).json({ id });
    })
    .catch((err) =>
      res.status(500).json({ message: "Failed to register user", error: err })
    );
});

router.post("/login", (req, res) => {
  const user = req.body;

  Users.findBy(user.username)
    .then((savedUser) => {
      if (savedUser && bcrypt.compareSync(user.password, savedUser.password)) {
        req.session.user = savedUser;
        res.status(200).json({ message: "Logged in!" });
      } else res.status(401).json({ message: "can't log you in." });
    })
    .catch((err) =>
      res.status(500).json({ message: "Failed to login user", error: err })
    );
});

module.exports = router;
