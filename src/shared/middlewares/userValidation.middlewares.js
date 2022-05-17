const { validationResult } = require('express-validator');

const validateEmail = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    req.validationErrors = {
      email: 'Email cannot be empty',
    };
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { body } = req;
  if (!body.password) {
    req.validationErrors = {
      ...req.validationErrors,
      password: 'Password cannot be empty',
    };
  }

  next();
};

const validationResults = (req, res, next) => {
  const errors = validationResult(req);
  const validationErrors = {};
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      validationErrors[error.param] = error.msg;
    });
    return res.status(400).send({ validationErrors });
  }

  next();
};

module.exports = { validateEmail, validatePassword, validationResults };
