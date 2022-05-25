const { asyncHandler } = require('../../shared/middlewares/asyncHandler.middleware');
const { createUser } = require('../services');

const postUser = asyncHandler(async (req, res) => {
  const { body } = req;
  await createUser({ ...body });
  return res.status(201).send({ message: 'User created' });
});

module.exports = postUser;
