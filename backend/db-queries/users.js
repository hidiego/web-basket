const db = require('../db-connector');

function getAll() {
  return db.many(
    `select id, name, lastName, email, reg_date, birthDate from users`
  );
}

function register(email, password, name, lastName, birthDate) {
  return db.one(
    `INSERT INTO users (email, password, name, lastName, birthDate) \
    VALUES ('${email}', '${password}', '${name}',' ${lastName}', '${birthDate}') \
    returning id, email, name, lastName, birthDate;`
  );
}

module.exports = {
  //USER QUERIES
  getAll,
  register
};
