const express = require('express');
const router = express.Router();
const isAuthenticated = require('../helper/accessControl');

const postsController = require('../controllers/posts/postsController');

router.get('/', postsController.getPosts);

router.get('/create',  isAuthenticated, postsController.getCreatePostForm);

router.post('/create', isAuthenticated, postsController.createPost);

router.get('/edit/:id', isAuthenticated, postsController.getEditPostForm);

router.put('/edit/:id', isAuthenticated, postsController.editPost);

router.delete('/delete/:id', isAuthenticated, postsController.deletePost);

module.exports = router;