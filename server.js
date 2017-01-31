var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.get('/api/home', function(req, res) {
  res.send({message: 'Home Page!!'});
});

app.listen(3001, function() {
  console.log('API Server running on port 3001');
});