const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-posts')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

const Post = require('./models/Post');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/posts', (req, res) => {
  Post.find({})
    .then(posts => {
      res.render('posts/posts', {
        posts
      });
    });
});

app.get('/posts/create', (req, res) => {
  const formTitle = 'Create Post';
  res.render('posts/post-form', {
    formTitle,
    method: 'POST'
  });
});

app.post('/posts/create', (req, res) => {
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

app.get('/posts/edit/:id', (req, res) => {
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

app.put('/posts/edit/:id', (req, res) => {
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

app.delete('/posts/delete/:id', (req, res) => {
  const { id } = req.params;
  Post.deleteOne({
    _id: id
  })
    .then(() => res.redirect('/posts'))
    .catch(err => console.log(err));
});

const port = 8080;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});