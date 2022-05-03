const express = require('express');

const app = express();

app.post('/api/v1.0/auth/local/signup', (req, res) => {
  res.status(201).send({ message: 'Success' });
});

module.exports = app;
