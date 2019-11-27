var express = require('express');
var router = express.Router();
var db = require('../db-queries/users');
var pg = require('../utils/passwordGenerator');
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');

// GET
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

router.get('/getUser/:email', auth, async (req, res, next) => {
  try {
    var email = req.params.email;
    user = await db.getUser(email);

    res.status(200).json({
      status: 'success',
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// POST
router.post('/login', async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    var user = await db.getFull(email);
    const token = jwt.sign({ email: user.email, role: user.role }, 'secret', {
      expiresIn: '1h'
    });
    // compare hashed password
    if (!bcrypt.compareSync(password, user.password)) {
      throw 'Error de autenticación';
    }
    delete user.password;
    // console.log(user);
    res.status(200).json({
      status: 0,
      message: `User ${user.email} logged in`,
      data: {
        token,
        expiresIn: 3600,
        user
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/register', auth, async (req, res, next) => {
  try {
    let { email, name, lastName, birthDate, role, playerNumber } = req.body;
    email = email.toLowerCase();
    let password = pg.generatePassword();
    console.log('PASSWORD', password);
    password = await bcrypt.hashSync(password);
    const user = await db.register(
      email,
      role,
      password,
      name,
      lastName,
      birthDate,
      playerNumber
    );
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
