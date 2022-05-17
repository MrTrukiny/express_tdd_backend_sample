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

module.exports = { validateEmail, validatePassword };
