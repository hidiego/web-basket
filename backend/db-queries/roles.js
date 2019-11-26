const db = require('../db-connector');

function getAll() {
  return db.many(`select * from roles`);
}

function getRole(id) {
  return db.one(`select * from roles where id = ${id}`);
}

module.exports = {
  //ROLE QUERIES
  getAll,
  getRole
};
