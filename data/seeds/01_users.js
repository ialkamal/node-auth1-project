exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "ismail", password: "ismail" },
        { id: 2, username: "basel", password: "basel" },
        { id: 3, username: "basel", password: "basel" },
      ]);
    });
};
