const db = require('../db-connector');

function getall() {
  return db.one(`select * from users`);
}

module.exports = {
  //USER QUERIES
  getall
};
