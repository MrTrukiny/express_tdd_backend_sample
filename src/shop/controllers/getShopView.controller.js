const { asyncHandler } = require('../../shared/middlewares/asyncHandler.middleware');
const config = require('../../../config');
const { NODE_ENV } = config;

const getShopView = asyncHandler(async (req, res, next) => {
  const { publicKey } = config[NODE_ENV].payments.mercadopago;
  res.status(200).render('index', { mercadoPagoPublicKey: publicKey });
});

module.exports = getShopView;
