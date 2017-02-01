var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String
});

module.exports = mongoose.model('Post', postSchema);