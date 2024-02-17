const getLoginForm = (req, res) => {
  res.render('users/login');
};

const getRegisterForm = (req, res) => {
  res.render('users/register');
};

module.exports = {
  getLoginForm,
  getRegisterForm
}