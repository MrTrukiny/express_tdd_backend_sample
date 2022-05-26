const { asyncHandler } = require('../../shared/middlewares/asyncHandler.middleware');
const { activateUser } = require('../services');

const postActivateUser = asyncHandler(async (req, res, _next) => {
  const { token } = req.params;
  await activateUser({ token });
  return res.status(200).json({ message: 'User activated' });
});

module.exports = postActivateUser;
