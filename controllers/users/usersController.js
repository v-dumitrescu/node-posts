const getLoginForm = (req, res) => {
  res.render('users/login');
};

const getRegisterForm = (req, res) => {
  res.render('users/register');
};

const registerUser = (req, res) => {

};

module.exports = {
  getLoginForm,
  getRegisterForm
}