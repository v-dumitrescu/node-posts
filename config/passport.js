const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new localStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.findOne({
      email
    })
      .then(user => {
        if (!user) {
          return done(null, false, {
            message: 'Email not found!'
          });
        }
        bcrypt.compare(password, user.password)
          .then((res) => {
            if (!res) {
              return done(null, false, {
                message: 'Invalid password!'
              });
            }
            return done(null, user);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }));
    
  passport.serializeUser((user, cb) => {
    return cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then(user => {
        return cb(null, user);
      });
  });
};