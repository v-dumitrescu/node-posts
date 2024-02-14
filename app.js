const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-posts')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

const Post = require('./models/Post');

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
  const title = 'Create Post';
  res.render('posts/post-form', {
    title
  });
});

app.post('/posts/create', (req, res) => {
  
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