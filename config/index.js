const development = require('./development');
const testing = require('./testing');
const production = require('./production');

const { NODE_ENV } = process.env;
const PORT = process.env.PORT || 3001;

module.exports = {
  development,
  testing,
  production,
  NODE_ENV,
  PORT,
};
