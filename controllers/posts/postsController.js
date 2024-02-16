const Post = require('../../models/Post');

const getPosts = (req, res) => {
  Post.find({})
    .then(posts => {
      res.render('posts/posts', {
        posts
      });
    });
}

const getCreatePostForm = (req, res) => {
  const formTitle = 'Create Post';
  res.render('posts/post-form', {
    formTitle,
    method: 'POST'
  });
}

const createPost = (req, res) => {
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
}


const getEditPostForm = (req, res) => {
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
}

const editPost = (req, res) => {
  const { title, content } = req.body;
  if (!title.trim() || !content.trim()) {
    res.redirect('/posts/edit/' + req.params.id);
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
}

const deletePost = (req, res) => {
  const { id } = req.params;
  Post.deleteOne({
    _id: id
  })
    .then(() => res.redirect('/posts'))
    .catch(err => console.log(err));
}

module.exports = {
  getPosts,
  getCreatePostForm,
  createPost,
  getEditPostForm,
  editPost,
  deletePost
};