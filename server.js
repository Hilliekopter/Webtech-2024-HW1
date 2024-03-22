const express = require('express');
const path = require('path');

const app = express();
const port = 8022;
app.use(express.static("public"));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/filming.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'filming.html'));
});

app.use(function(request, response) {
  response.status(404).send("Page not found!");
});

// app.use() // Router gebruiken om tussen pagina's te navigeren

app.listen(port);
console.log('Server started at http://localhost:' + port);

// todo: login pagina -> sessions