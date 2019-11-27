const db = require('../db-connector');

function getAll() {
  return db.many(
    `select id, name, role, lastName, email, regDate, birthDate from users`
  );
}

function register(
  email,
  role,
  password,
  name,
  lastName,
  birthDate,
  playerNumber
) {
  palyerNumber = playerNumber === null ? 'null' : `'${playerNumber}'`;
  return db.one(
    `INSERT INTO users (email, role, password, name, lastName, birthDate, playerNumber) \
    VALUES ('${email}',${role}, '${password}', '${name}',' ${lastName}', '${birthDate}', null) \
    returning id, email, role, name, lastName, birthDate`
  );
}

function getFull(email) {
  return db.one(`select * from users where email = '${email}'`);
}

function getUser(email) {
  return db.one(
    `select id, email, role, name, lastName, birthDate, regDate from users where email = '${email}'`
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
