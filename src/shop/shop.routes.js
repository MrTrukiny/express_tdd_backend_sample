const { Router } = require('express');

// Controllers
const { getShopView, postShopPayment } = require('./controllers');

const { API_BASE_URL } = require('../shared/utils/constants');

// eslint-disable-next-line new-cap
const router = Router();

router.post(`${API_BASE_URL}/shops/checkout`, postShopPayment);

router.get(`${API_BASE_URL}/shops`, getShopView);

module.exports = router;
