const getIndex = (req, res) => {
  res.render('pages/index', {
    path: req.path
  });
}

const getAbout = (req, res) => {
  res.render('pages/about', {
    path: req.path
  });
}

module.exports = {
  getIndex,
  getAbout
};