const express = require('express');
require('colors');

// Import Middlewares
const {
  errorHandlerMiddleware,
} = require('./shared/middlewares/errorHandler.middleware');
const { notFound404Middleware } = require('./shared/middlewares/notFound.middleware');

// Import Routes
const userRoutes = require('./users/users.routes');

const app = express();

// Pre-routes middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.use(notFound404Middleware);

// Post-routes middlewares
app.use(errorHandlerMiddleware);

module.exports = app;
