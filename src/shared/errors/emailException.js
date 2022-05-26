const { BaseError } = require('./baseError');
const { HTTP_STATUS_CODES } = require('../utils/constants');

class EmailException extends BaseError {
  constructor(message = 'Email failure') {
    super('EmailException', message, HTTP_STATUS_CODES.BAD_GATEWAY);
  }
}

module.exports = { EmailException };
