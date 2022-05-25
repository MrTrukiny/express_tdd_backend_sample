const express = require('express');
require('colors');

// Import Middlewares
const {
  errorHandlerMiddleware,
} = require('./shared/middlewares/errorHandler.middleware');

// Import Routes
const userRoutes = require('./users/users.routes');

const app = express();

// Pre-routes middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

// Post-routes middlewares
app.use(errorHandlerMiddleware);

module.exports = app;
