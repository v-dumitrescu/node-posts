// env variables
require('dotenv').config();

// Database connection
require('./config/connection');

// Express function call
const app = require('./config/setup');

// Index and About routes
const pagesRouter = require('./routes/pages');
app.use('/', pagesRouter);

// Posts Routes
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Users Routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const port = 8080;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});