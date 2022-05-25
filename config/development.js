module.exports = {
  database: {
    mongoUri: process.env.MONGO_URI_DEV,
  },
  email: {
    transportConfig: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'adonis.parker37@ethereal.email',
        pass: 'mFCDqMxSeE8P6GJxf2',
      },
    },
  },
};
