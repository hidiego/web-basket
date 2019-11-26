const db = require('../db-connector');

function getAll() {
  return db.many(`select id, name, lastName, email, reg_date, birthDate from users`);
}

function register(email, password, name, lastName, birthDate) {
  return db.one(
    `INSERT INTO users (email, password, name, lastName, birthDate) \
    VALUES ('${email}', '${password}', '${name}',' ${lastName}', '${birthDate}') \
    returning id, email, name, lastName, birthDate`
  );
}

function getFull(email) {
  return db.one(`select * from users where email = '${email}'`);
}

function getUser(email) {
  return db.one(
    `select id, email, name, lastName, birthDate, reg_date from users where email = '${email}'`
  );
}

function getRole(id) {
  return db.one(`select * from roles where id = ${id}`);
}

module.exports = {
  //USER QUERIES
  getAll,
  register,
  getFull,
  getUser,
  getRole
};
