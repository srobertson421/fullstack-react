var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.route('/')
.get(function(req, res) {
  Post.find({}, function(err, posts) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(posts);
  });
})
.post(function(req, res) {
  Post.create(req.body, function(err, post) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(post);
  });
});

router.route('/:id')
.get(function(req, res) {
  Post.find({_id: req.params.id}, function(err, post) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(post)
  });
})
.put(function(req, res) {
  Post.update({_id: req.params.id}, req.body, function(err, post) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(post);
  });
})
.delete(function(req, res) {
  Post.remove({_id: req.params.id}, function(err, post) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(post);
  });
});

module.exports = router;