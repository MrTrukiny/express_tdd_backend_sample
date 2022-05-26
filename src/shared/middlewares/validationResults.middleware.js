const { validationResult } = require('express-validator');

const validationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.validationErrors = {};
    errors.array().forEach((error) => {
      errors.validationErrors[error.param] = error.msg;
    });
    return next(errors);
  }

  next();
};

module.exports = { validationResults };
