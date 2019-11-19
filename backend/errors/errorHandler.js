module.exports = (error, req, res, next) => {
  console.log('ERROR:', error.message || error);
  const status = 500;
  res.status(status).json({
    status: 'error',
    message: error.message,
    data: error
  });
};
