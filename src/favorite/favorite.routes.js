const { Router } = require('express');
const { body } = require('express-validator');

const { API_BASE_URL } = require('../shared/utils/constants');
const {
  validationResults,
} = require('../shared/middlewares/validationResults.middleware');

// Controllers
const { postFavorite } = require('./controllers');

const router = new Router();

router.post(
  `${API_BASE_URL}/favs`,
  body('title', 'Title is required').notEmpty(),
  body('description', 'Description is required').notEmpty(),
  body('link', 'Link is required').notEmpty(),
  body('price', 'Price is required').notEmpty(),
  body('owner', 'Owner is required').notEmpty(),
  validationResults,
  postFavorite,
);

module.exports = router;
