const { createUser } = require('../services');

const postUser = async (req, res) => {
  const { body } = req;
  if (req.validationErrors) {
    const response = { validationErrors: { ...req.validationErrors } };
    return res.status(400).send(response);
  }

  await createUser({ ...body });
  return res.status(201).send({ message: 'User created' });
};

module.exports = postUser;
