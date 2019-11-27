var express = require('express');
var router = express.Router();
var db = require('../db-queries/roles');
var auth = require('../middleware/auth');

/* GET users listing. */
router.get('/all', auth, async (req, res, next) => {
  try {
    const roles = await db.getAll();
    res.status(200).json({
      status: 'success',
      message: 'Roles fetched successfully',
      data: roles
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/getRole/:id', auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await db.getRole(id);

    res.status(200).json({
      status: 'success',
      message: 'Role fetched successfully',
      data: role
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
