var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);

//DB CONNECTION
const dbHost = process.env.POSTGRES_HOST || 'localhost';
const dbPort = process.env.POSTGRESS_PORT || '5432';
const dbUser = process.env.POSTGRESS_USER || 'postgres';
const dbName = process.env.POSTGRES_DB || 'postgres';
const dbPass = process.env.POSTGRES_PASSWORD || 'example';

try {
  var connectionString = `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
  var db = pgp(connectionString);
} catch (error) {
  console.log(error);
}

module.exports = db;
