var express = require('express');
var router = express.Router();
var db = require('../db-queries/users');
var pg = require('../utils/passwordGenerator');
var bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.get('/all', async (req, res, next) => {
  try {
    const users = await db.getAll();
    res.status(200).json({
      data: users
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;
  email = String(email).toLowerCase();
  res.send(users);
});

router.post('/register', async (req, res, next) => {
  try {
    let { email, name, lastName, birthDate } = req.body;
    const password = pg.generatePassword();
    email = email.toLowerCase();
    const user = await db.register(email, password, name, lastName, birthDate);
    res.status(200).json({
      status: 0,
      message: `User ${user.email} registered successfully`,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
