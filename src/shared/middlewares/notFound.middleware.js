const { HTTP404Error } = require('../errors/httpErrors');

const notFound404Middleware = (_req, _res, _next) => {
  throw new HTTP404Error();
};

module.exports = { notFound404Middleware };
