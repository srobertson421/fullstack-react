var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/fullstackreact');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/posts', require('./controllers/posts-controller.js'));

app.listen(3001, function() {
  console.log('API Server running on port 3001');
});