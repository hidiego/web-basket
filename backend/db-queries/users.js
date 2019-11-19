const db = require('../db-connector');

function getall() {
  return db.many(`select id, email, reg_date from users`);
}

function insertUser(email, password) {
  return db.none(
    `insert into users(email, password) values (${email},${password})`
  );
}

module.exports = {
  //USER QUERIES
  getall
};
