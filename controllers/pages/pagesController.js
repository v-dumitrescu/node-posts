const getIndex = (req, res) => {
  res.render('pages/index');
}

const getAbout = (req, res) => {
  res.render('pages/about');
}

module.exports = {
  getIndex,
  getAbout
};