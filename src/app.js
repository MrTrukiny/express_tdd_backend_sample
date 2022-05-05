const express = require('express');
require('colors');

// Models
const User = require('./models/User.model');

// Config
const connectToDb = require('./config/database');

const app = express();
connectToDb();

app.use(express.json());

app.post('/api/v1.0/auth/local/signup', (req, res) => {
  User.create(req.body).then(() => {
    res.status(201).send({ message: 'Success' });
  });
});

module.exports = app;
