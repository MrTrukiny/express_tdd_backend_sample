/* eslint-disable camelcase */
const mercadopago = require('mercadopago'); //
const { MercadopagoApiException } = require('../errors/mercadoPagoApiException');

const checkoutApi = async ({ ...paymentData }) => {
  try {
    setAccessTokenToApi();
    const paymentPayload = parsePaymentData(paymentData);
    const { response } = await mercadopago.payment.save(paymentPayload); //
    const { status_detail: statusDetail, status, id } = response;
    return { statusDetail, status, id };
  } catch (error) {
    const { errorMessage, errorStatus } = validateError(error); //
    throw new MercadopagoApiException(errorMessage, errorStatus);
  }
};

module.exports = { checkoutApi };

function setAccessTokenToApi() {
  const config = require('../../../config');
  const { NODE_ENV } = config;
  const { accessToken } = config[NODE_ENV].payments.mercadopago;
  mercadopago.configurations.setAccessToken(accessToken);
}

function parsePaymentData(paymentData) {
  const {
    payer,
    transactionAmount,
    token,
    description,
    installments,
    paymentMethodId,
    issuerId,
  } = paymentData;

  const paymentPayload = {
    transaction_amount: Number(transactionAmount),
    token,
    description,
    installments: Number(installments),
    payment_method_id: paymentMethodId,
    issuer_id: issuerId,
    payer: {
      email: payer.email,
      identification: {
        type: payer.identification.docType,
        number: payer.identification.docNumber,
      },
    },
  };

  return paymentPayload;
}

function validateError(error) {
  let errorMessage;
  let errorStatus;

  if (error.cause) {
    const sdkErrorMessage = error.cause[0].description;
    errorMessage = sdkErrorMessage || errorMessage;

    const sdkErrorStatus = error.status;
    errorStatus = sdkErrorStatus || errorStatus;
  }

  return { errorMessage, errorStatus };
}
