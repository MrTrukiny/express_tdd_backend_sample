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
  payments: {
    mercadopago: {
      publicKey: process.env.MERCADO_PAGO_PUBLIC_KEY,
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    },
  },
};
