var mongoose = require('mongoose');
var UserSchema = require('./user').schema;

var ChatSchema = new mongoose.Schema({
  user: String,
  message: String
});

var LobbySchema = new mongoose.Schema({
  title: String,
  players: [UserSchema],
  chatMessages: [ChatSchema],
  gameStarted: Boolean
});

module.exports = mongoose.model('Lobby', LobbySchema);
