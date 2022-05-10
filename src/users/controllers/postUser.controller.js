const { createUser } = require('../services');

const postUser = async (req, res) => {
  const { body } = req;
  await createUser({ ...body });
  res.status(201).send({ message: 'User created' });
};

module.exports = postUser;
