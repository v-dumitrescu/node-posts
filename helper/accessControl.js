module.exports = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Forbidden');
  res.redirect('/posts');
};