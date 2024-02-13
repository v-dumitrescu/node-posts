const express = require('express');
const app = express();

app.get('/', (req, res) => {
  
});

app.get('/about', (req, res) => {

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