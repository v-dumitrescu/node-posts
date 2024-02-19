const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users/usersController');

router.get('/register', usersController.getRegisterForm);

router.post('/register', usersController.registerUser);

router.get('/login', usersController.getLoginForm);

router.post('/login', usersController.setLogin);

router.post('/logout', usersController.setLogout);

module.exports = router;