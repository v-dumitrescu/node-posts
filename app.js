const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');

const mongoose = require('mongoose');

const pagesRouter = require('./routes/pages');
const postsRouter = require('./routes/posts');

mongoose.connect('mongodb://localhost/node-posts')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.use('/', pagesRouter);
app.use('/posts', postsRouter);

const port = 8080;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});