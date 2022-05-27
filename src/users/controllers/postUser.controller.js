const { asyncHandler } = require('../../shared/middlewares/asyncHandler.middleware');
const { createUser } = require('../services');

const postUser = asyncHandler(async (req, res) => {
  const { body } = req;
  const user = await createUser({ ...body });
  return res.status(201).send({ data: { user }, message: 'User created', status: 'OK' });
});

module.exports = postUser;
