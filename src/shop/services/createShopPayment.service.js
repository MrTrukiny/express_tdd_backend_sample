const mercadopagoApi = require('../../shared/apis/mercadopago.api');

const createShopPayment = async ({ ...paymentData }) => {
  const paymentInfo = await mercadopagoApi.checkoutApi({ ...paymentData });
  return paymentInfo;
};

module.exports = { createShopPayment };
