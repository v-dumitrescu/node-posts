const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine', 'pug');

module.exports = app;