const express = require('express');
require('colors');
const bcrypt = require('bcrypt');

// Models
const User = require('./models/User.model');

const app = express();

app.use(express.json());

app.post('/api/v1.0/auth/local/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = { ...req.body, password: hash };
    /* const user = Object.assign({}, req.body, { password: hash });
    const user = {
      email: req.body.email,
      password: hash,
    }; */
    User.create(user).then(() => {
      res.status(201).send({ message: 'User created' });
    });
  });
});

module.exports = app;
