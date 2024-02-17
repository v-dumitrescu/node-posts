const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users/usersController');

router.get('/register', usersController.getRegisterForm);

router.get('/login', usersController.getLoginForm);

module.exports = router;