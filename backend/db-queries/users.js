const db = require('../db-connector');

function getall() {
  return db.many(`select * from users`);
}

module.exports = {
  //USER QUERIES
  getall
};
