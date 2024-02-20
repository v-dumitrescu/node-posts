const express = require('express');
const router = express.Router();
const isAuthenticated = require('../helper/accessControl');


const usersController = require('../controllers/users/usersController');

router.get('/register', usersController.getRegisterForm);

router.post('/register', usersController.registerUser);

router.get('/login', usersController.getLoginForm);

router.post('/login', usersController.setLogin);

router.get('/user-posts', isAuthenticated, usersController.getUserPosts);

router.post('/logout', usersController.setLogout);

module.exports = router;