const { Result } = require('express-validator');
// const { APIError } = require('../errors/httpErrors');

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log('Error from Middleware =>', error);

  // const apiError = new APIError();

  if (res.headerSent) {
    return next(error);
  }

  // Express-validator errors array
  if (error instanceof Result) {
    const { validationErrors } = error;
    return res.status(400).send({ error: { validationErrors } });
  }

  /* res.status(error.statusCode || apiError.statusCode).json({
    error: error.message || apiError.message,
    status: 'ERROR',
  }); */

  res
    .status(error.statusCode || 500)
    .json({ error: error.message || 'An unknown error ocurred' });
};

module.exports = { errorHandlerMiddleware };
