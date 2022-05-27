const express = require('express');
require('colors');

// Import middlewares
const {
  errorHandlerMiddleware,
} = require('./shared/middlewares/errorHandler.middleware');
const { notFound404Middleware } = require('./shared/middlewares/notFound.middleware');

// Import routes
const userRoutes = require('./users/users.routes');
const favoriteRoutes = require('./favorite/favorite.routes');

const app = express();

// Pre-routes middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(favoriteRoutes);

app.use(notFound404Middleware);

// Post-routes middlewares
app.use(errorHandlerMiddleware);

module.exports = app;
