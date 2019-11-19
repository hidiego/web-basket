var express = require('express');
var router = express.Router();
var db = require('../db-queries/users');
var bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.get('/all', async (req, res, next) => {
  const users = await db.getall();
  res.status(200).json({
    data: users
  });
});

router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  res.send(users);
});

module.exports = router;
