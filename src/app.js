const express = require('express');
require('colors');

// Routes
const userRoutes = require('./users/users.routes');

const app = express();

app.use(express.json());

app.use(userRoutes);

module.exports = app;
