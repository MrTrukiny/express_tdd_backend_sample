const { BaseError } = require('./baseError');
const { HTTP_STATUS_CODES } = require('../utils/constants');

class MercadopagoApiException extends BaseError {
  constructor(
    message = 'Unknown error cause',
    statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
  ) {
    super('MercadopagoApiException', message, statusCode);
  }
}

module.exports = { MercadopagoApiException };
