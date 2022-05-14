const { Router } = require('express');
const { postUser } = require('./controllers');

const { API_BASE_URL } = require('../shared/constants');

// eslint-disable-next-line new-cap
const router = Router();

const validateEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send({
      validationErrors: {
        email: 'Email cannot be empty',
        password: 'Password cannot be empty',
      },
    });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    return res.status(400).send({
      validationErrors: {
        email: 'Email cannot be empty',
      },
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { body } = req;
  if (!body.password) {
    return res.status(400).send({
      validationErrors: {
        password: 'Password cannot be empty',
      },
    });
  }

  next();
};

router.post(
  `${API_BASE_URL}/auth/local/signup`,
  validateEmailAndPassword,
  validateEmail,
  validatePassword,
  postUser,
);

module.exports = router;
