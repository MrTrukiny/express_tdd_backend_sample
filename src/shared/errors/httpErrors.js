const { BaseError } = require('./baseError');
const { HTTP_STATUS_CODES } = require('../utils/constants');

class HTTP400Error extends BaseError {
  constructor(message = 'Bad request') {
    super('HTTP400Error', message, HTTP_STATUS_CODES.BAD_REQUEST);
  }
}

class HTTP404Error extends BaseError {
  constructor(message = 'Not found') {
    super('NOT FOUND', message, HTTP_STATUS_CODES.NOT_FOUND);
  }
}

class APIError extends BaseError {
  constructor(
    message = "An unknown error has ocurred! We'll fix it as soon as possible",
  ) {
    super('APIError', message, HTTP_STATUS_CODES.INTERNAL_SERVER);
  }
}

module.exports = { HTTP400Error, HTTP404Error, APIError };
