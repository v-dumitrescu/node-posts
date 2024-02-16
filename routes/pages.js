const express = require('express');
const router = express.Router();

const pagesController = require('../controllers/pages/pagesController');

router.get('/', pagesController.getIndex);

router.get('/about', pagesController.getAbout);

module.exports = router;