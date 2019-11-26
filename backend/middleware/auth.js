const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret');
    req.tk_data = {
      email: decodedToken.email,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    err = new Error('You are not authenticated!');
    err.code = 'notAuthenticated';
    next(err);
  }
};
