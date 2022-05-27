const { asyncHandler } = require('../../shared/middlewares/asyncHandler.middleware');
const { createShopPayment } = require('../services');

const postShopPayment = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const paymentInfo = await createShopPayment({ ...body });
  res
    .status(201)
    .json({ data: { paymentInfo }, message: 'Payment created', status: 'OK' });
});

module.exports = postShopPayment;
