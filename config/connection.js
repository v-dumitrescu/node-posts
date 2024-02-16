const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-posts')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));