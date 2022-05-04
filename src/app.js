const express = require('express');
require('colors');

// Config
const connectToDb = require('./config/database');

const app = express();
connectToDb();

app.post('/api/v1.0/auth/local/signup', (req, res) => {
  res.status(201).send({ message: 'Success' });
});

module.exports = app;
