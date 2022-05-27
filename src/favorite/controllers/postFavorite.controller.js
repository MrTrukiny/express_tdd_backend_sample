const { asyncHandler } = require('../../shared/middlewares/asyncHandler.middleware');
const { createFavorite } = require('../services');

const postFavorite = asyncHandler(async (req, res, _next) => {
  const { body } = req;
  const favorite = await createFavorite({ ...body });
  return res
    .status(201)
    .json({ data: { favorite }, message: 'Favorite created', status: 'OK' });
});

module.exports = postFavorite;
