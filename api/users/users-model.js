const db = require("../../data/knexConfig");

function find() {
  return db("users");
}

async function findBy(username) {
  const [user] = await db("users").where({ username });
  return user;
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return id;
}

module.exports = { find, findBy, add };
