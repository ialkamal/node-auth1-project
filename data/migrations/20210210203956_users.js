exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username", 128).unique();
    tbl.string("password");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
