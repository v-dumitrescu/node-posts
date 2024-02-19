const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const getLoginForm = (req, res) => {
  res.render('users/login');
};

const getRegisterForm = (req, res) => {
  res.render('users/register');
};

const registerUser = (req, res) => {
  const { email, firstName, lastName, password, passwordv } = req.body;

  User.findOne({
    email: email
  })
    .then(user => {
      if (user) {
        req.flash('error_msg', 'Email already registered!');
        res.redirect('/users/register');
      } else {
        if (
          !email.trim()
          || !firstName.trim()
          || !lastName.trim()
          || !password.trim()
          || !passwordv.trim()
        ) {
          req.flash('error_msg', 'All fields are required!');
          res.redirect('/users/register');
        } else {
          if (password === passwordv) {

            const newUser = {
              email,
              firstName,
              lastName,
              password
            }

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                new User(newUser)
                  .save()
                  .then(() => {
                    req.flash('success_msg', 'You can now login!');
                    res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              });
            });

          } else {
            req.flash('error_msg', 'Passwords do not match!');
            res.redirect('/users/register');
          }
        }
      }
    })
    .catch(err => console.log(err));
};

const setLogin = passport.authenticate('local', {
  successRedirect: '/posts',
  failureRedirect: '/users/login',
  failureFlash: true
});

const setLogout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};

module.exports = {
  getLoginForm,
  getRegisterForm,
  registerUser,
  setLogin,
  setLogout
}