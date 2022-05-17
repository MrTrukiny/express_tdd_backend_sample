const { Router } = require('express');
const { body, validationResult } = require('express-validator');

// Controllers
const { postUser } = require('./controllers');

/* // Middlewares
const {
  validateEmail,
  validatePassword,
} = require('../shared/middlewares/userValidation.middlewares'); */

const { API_BASE_URL } = require('../shared/constants');

// eslint-disable-next-line new-cap
const router = Router();

router.post(
  `${API_BASE_URL}/auth/local/signup`,
  body('email').notEmpty().withMessage('Email cannot be empty'),
  body('password').notEmpty().withMessage('Password cannot be empty'),
  (req, res, next) => {
    // Finds the validation errors in this request
    // and wraps them in an object with handy functions
    const errors = validationResult(req);
    const validationErrors = {};
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        validationErrors[error.param] = error.msg;
      });
      return res.status(400).send({ validationErrors });
    }

    next();
  },
  postUser,
);

module.exports = router;
