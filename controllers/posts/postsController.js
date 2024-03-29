const Post = require('../../models/Post');
const { csrfSync } = require('csrf-sync');
const { generateToken } = csrfSync();

const getPosts = (req, res) => {
  const title = 'All posts';
  Post.find({})
    .then(posts => {
      res.render('posts/posts', {
        posts,
        title,
        path: '/posts',
        token: generateToken(req)
      });
    });
}

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render('posts/post', {
        post,
        token: generateToken(req)
      });
    })
    .catch(err => console.log(err));
};

const getCreatePostForm = (req, res) => {
  const formTitle = 'Create Post';
  res.render('posts/post-form', {
    formTitle,
    method: 'POST',
    title: req.query.title ? req.query.title : '',
    content: req.query.content ? req.query.content : '',
    token: generateToken(req)
  });
}

const createPost = (req, res) => {
  const formTitle = 'Create Post';
  const { title, content } = req.body;
  if (!title.trim() || !content.trim()) {
    req.flash('error_msg', 'Both fields are required!');
    res.redirect('/posts/create?title='+title+'&content='+content);
  } else {
    new Post({
      title,
      content,
      user: req.user.id
    })
      .save()
      .then(() => {
        req.flash('success_msg', 'Post created!');
        res.redirect('/users/user-posts');
      })
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
      if(post.user !== req.user.id) {
        req.flash('error_msg', 'Forbidden');
        return res.redirect('/');
      }
      const { title, content } = post;
      res.render('posts/post-form', {
        formTitle,
        method: 'POST',
        action: '/posts/edit/' + post._id + '?_method=PUT',
        title,
        content,
        token: generateToken(req)
      });
    })
    .catch(err => console.log(err));
}

const editPost = (req, res) => {
  const { title, content } = req.body;
  if (!title.trim() || !content.trim()) {
    req.flash('error_msg', 'Both fields are required!');
    res.redirect('/posts/edit/' + req.params.id);
  } else {
    Post.updateOne({
      _id: req.params.id
    }, {
      title,
      content
    })
      .then(() => {
        req.flash('success_msg', 'Post updated!');
        res.redirect('/users/user-posts');
      })
      .catch(err => console.log(err));
  }
}

const deletePost = (req, res) => {
  const { id } = req.params;
  Post.deleteOne({
    _id: id
  })
    .then(() => {
      req.flash('success_msg', 'Post deleted!');
      res.redirect('/users/user-posts');
    })
    .catch(err => console.log(err));
}

module.exports = {
  getPosts,
  getPost,
  getCreatePostForm,
  createPost,
  getEditPostForm,
  editPost,
  deletePost
};