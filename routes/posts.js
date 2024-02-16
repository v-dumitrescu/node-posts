const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts/postsController');

router.get('/', postsController.getPosts);

router.get('/create', postsController.getCreatePostForm);

router.post('/create', postsController.createPost);

router.get('/edit/:id', postsController.getEditPostForm);

router.put('/edit/:id', postsController.editPost);

router.delete('/delete/:id', postsController.deletePost);

module.exports = router;