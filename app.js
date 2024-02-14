const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/posts', (req, res) => {
  
});

app.get('/posts/create', (req, res) => {
  
});

app.post('/posts/create', (req, res) => {

});

app.get('/posts/edit/:id', (req, res) => {
  
});

app.put('/posts/edit/:id', (req, res) => {

});

app.delete('/posts/delete/:id', (req, res) => {

});

const port = 8080;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});