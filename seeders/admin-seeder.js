var mongoose = require('mongoose');
var User = require('../models/user');

mongoose.connect('mongodb://localhost/fullstackreact');

var user = {
  username: 'srobertson',
  email: 'sean@sean.com',
  password: 'sean1234'
}

User.create(user, function(err, user) {
  if(err) {
    console.log('DB Error', err);
  } else {
    console.log('Created User');
  }
});