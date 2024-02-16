const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'g45egeuivhwurv34t4iuogerg34',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.set('view engine', 'pug');

module.exports = app;