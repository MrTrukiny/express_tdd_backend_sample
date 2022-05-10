const { Router } = require('express');
const { postUser } = require('./controllers');

const { API_BASE_URL } = require('../shared/constants');

// eslint-disable-next-line new-cap
const router = Router();

router.post(`${API_BASE_URL}/auth/local/signup`, postUser);

module.exports = router;
