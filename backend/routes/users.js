var express = require('express');
var router = express.Router();
var db = require('../db-queries/users');

/* GET users listing. */
router.get('/all', async (req, res, next) => {
  const users = await db.getall();
  res.send(users);
});

module.exports = router;
