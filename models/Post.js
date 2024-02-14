const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('posts', PostSchema);