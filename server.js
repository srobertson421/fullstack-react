var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();
var expressWs = require('express-ws')(app);

var User = require('./models/user');
var secret = process.env.JWT_SECRET || 'supersecret';

mongoose.connect('mongodb://localhost/fullstackreact');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/posts', require('./controllers/posts-controller.js'));

// Single login route for admin
app.post('/auth/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.status(401).send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

// WebSocket routes
app.ws('/chat', function(ws, req) {
  ws.on('message', function(msg) {
    wsClients.clients.forEach(function(client) {
      client.send(msg);
    });
  });
});

var wsClients = expressWs.getWss('/chat');

app.listen(3001, function() {
  console.log('API Server running on port 3001');
});
