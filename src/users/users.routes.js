/* eslint-disable capitalized-comments */
const { Router } = require('express');
const { body } = require('express-validator');

// Controllers
const { postUser } = require('./controllers');

// Models
const User = require('../models/User.model');

// Middlewares
const {
  // joiValidation,
  validationResults,
} = require('../shared/middlewares/userValidation.middlewares');

const { API_BASE_URL } = require('../shared/constants');

// eslint-disable-next-line new-cap
const router = Router();

router.post(
  `${API_BASE_URL}/auth/local/signup`,
  // joiValidation,
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Email in use');
      }
    }),
  body('password').notEmpty().withMessage('Password cannot be empty'),
  validationResults,
  postUser,
);

module.exports = router;
