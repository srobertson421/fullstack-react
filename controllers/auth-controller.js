var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user').model;
var secret = process.env.JWT_SECRET || 'supersecret';

router.route('/login')
.post(function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.status(401).send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

router.route('/signup')
.post(function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (user) return res.status(500).send({message: 'User already exists'});

    User.create(req.body, function(err, user) {
      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

module.exports = router;
