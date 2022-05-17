const { Router } = require('express');
// const { body, validationResult } = require('express-validator');

// Controllers
const { postUser } = require('./controllers');

// Middlewares
const {
  validateEmail,
  validatePassword,
} = require('../shared/middlewares/userValidation.middlewares');

const { API_BASE_URL } = require('../shared/constants');

// eslint-disable-next-line new-cap
const router = Router();

router.post(
  `${API_BASE_URL}/auth/local/signup`,
  validateEmail,
  validatePassword,
  postUser,
);

module.exports = router;
