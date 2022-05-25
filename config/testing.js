module.exports = {
  database: {
    mongoUri: process.env.MONGO_URI_TEST,
  },
  email: {
    transportConfig: {
      host: 'localhost',
      port: 8587,
      tls: {
        rejectUnauthorized: false,
      },
    },
  },
};
