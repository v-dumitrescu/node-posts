const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-posts')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

const Post = require('./models/Post');

app.use(bodyParser.urlencoded({extended: false}));
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
  if(!title.trim() || !content.trim()) {
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
  
});

app.put('/posts/edit/:id', (req, res) => {

});

app.delete('/posts/delete/:id', (req, res) => {

});

const port = 8080;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});