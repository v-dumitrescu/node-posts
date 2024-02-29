const express = require('express');
const router = express.Router();
const isAuthenticated = require('../helper/accessControl');
const postsController = require('../controllers/posts/postsController');

const { csrfSync } = require('csrf-sync');
const { csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: (req) => {
    return req.body["CSRFToken"];
  }
});

router.get('/', postsController.getPosts);

router.get('/post/:id', postsController.getPost);

router.get('/create',
  isAuthenticated,
  postsController.getCreatePostForm
);

router.post('/create',
  isAuthenticated,
  csrfSynchronisedProtection,
  postsController.createPost
);

router.get('/edit/:id',
  isAuthenticated,
  postsController.getEditPostForm
);

router.put('/edit/:id',
  isAuthenticated,
  csrfSynchronisedProtection,
  postsController.editPost
);

router.delete('/delete/:id',
  isAuthenticated, 
  csrfSynchronisedProtection,
  postsController.deletePost
);

module.exports = router;