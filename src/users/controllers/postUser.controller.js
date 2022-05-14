const { createUser } = require('../services');

const postUser = async (req, res) => {
  const { body } = req;
  await createUser({ ...body });
  return res.status(201).send({ message: 'User created' });
};

module.exports = postUser;
