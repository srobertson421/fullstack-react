var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var app = express();
var expressWs = require('express-ws')(app);

var secret = process.env.JWT_SECRET || 'supersecret';

mongoose.connect('mongodb://localhost/fullstackreact');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
  next();
});

app.use('/api/auth', require('./controllers/auth-controller'));
app.use('/api/posts', require('./controllers/posts-controller'));
app.use('/api/lobbies', require('./controllers/lobbies-controller'));

app.listen(3001, function() {
  console.log('API Server running on port 3001');
});
