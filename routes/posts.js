const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.find({})
    .then(posts => {
      res.render('posts/posts', {
        posts
      });
    });
});

router.get('/create', (req, res) => {
  const formTitle = 'Create Post';
  res.render('posts/post-form', {
    formTitle,
    method: 'POST'
  });
});

router.post('/create', (req, res) => {
  const formTitle = 'Create Post';
  const { title, content } = req.body;
  if (!title.trim() || !content.trim()) {
    res.render('posts/post-form', {
      formTitle,
      method: 'POST',
      action: '/posts/create',
      title,
      content,
      error: 'Both fields are required!'
    });
  } else {
    new Post({
      title,
      content
    })
      .save()
      .then(() => res.redirect('/posts'))
      .catch(err => console.log(err));
  }
});

router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const formTitle = 'Edit Post';
  Post.findOne({
    _id: id
  })
    .then(post => {
      const { title, content } = post;
      res.render('posts/post-form', {
        formTitle,
        method: 'POST',
        action: '/posts/edit/' + post._id + '?_method=PUT',
        title,
        content
      });
    })
    .catch(err => console.log(err));
});

router.put('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  if (!title.trim() || !content.trim()) {
    res.redirect('/posts/edit/'+req.params.id);
  } else {
    Post.updateOne({
      _id: req.params.id
    }, {
      title,
      content
    })
      .then(() => res.redirect('/posts'))
      .catch(err => console.log(err));
  }
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  Post.deleteOne({
    _id: id
  })
    .then(() => res.redirect('/posts'))
    .catch(err => console.log(err));
});

module.exports = router;