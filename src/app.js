const express = require('express');
require('colors');

// Models
const User = require('./models/User.model');

const app = express();

app.use(express.json());

app.post('/api/v1.0/auth/local/signup', (req, res) => {
  User.create(req.body).then(() => {
    res.status(201).send({ message: 'Success' });
  });
});

module.exports = app;
