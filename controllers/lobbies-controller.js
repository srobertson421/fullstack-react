var express = require('express');
var router = express.Router();
var Lobby = require('../models/lobby');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

var secret = process.env.JWT_SECRET || 'supersecret';

// router.use(function(req, res, next) {
//   //console.log(req.headers.authorization);
//   var token = req.headers.authorization;
//   //var token = req.headers.authorization.substring(6, req.headers.authorization.length);
//   jwt.verify(token, secret, {ignoreExpiration: true}, function(err, decoded) {
//     console.log(decoded);
//     console.log(err);
//     next();
//   });
// });

var socketRooms = {};

router.route('/')
.get(function(req, res) {
  Lobby.find({}, function(err, lobbies) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(lobbies);
  });
})
.post(function(req, res) {
  Lobby.create(req.body, function(err, lobby) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(lobby);
  });
});

router.route('/:id')
.get(function(req, res) {
  Lobby.findOne({_id: req.params.id}, function(err, lobby) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(lobby);
  });
})
.put(function(req, res) {
  Lobby.update({_id: req.params.id}, req.body, function(err, lobby) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(lobby);
  });
})
.delete(function(req, res) {
  Lobby.remove({_id: req.params.id}, function(err, lobby) {
    if(err) return res.status(500).send({message: 'Database Error'});

    res.send(lobby);
  });
});

router.ws('/:lobbyId/chat/:clientId', function(ws, req) {
  console.log('Connected via route');

  if(!socketRooms[req.params.lobbyId]) {
    socketRooms[req.params.lobbyId] = {};
    socketRooms[req.params.lobbyId].clients = {};
    socketRooms[req.params.lobbyId].clients[req.params.clientId] = ws;
  } else {
    socketRooms[req.params.lobbyId].clients[req.params.clientId] = ws;
  }

  socketRooms[req.params.lobbyId].clients[req.params.clientId].on('close', function(event) {
    delete socketRooms[req.params.lobbyId].clients[req.params.clientId];
  });

  socketRooms[req.params.lobbyId].clients[req.params.clientId].on('message', function(msg) {
    Lobby.findByIdAndUpdate(
      req.params.lobbyId,
      {$push: {"chatMessages": {user: req.params.clientId, message: msg}}},
      {safe: true, upsert: true, new : true},
      function(err, lobby) {
        var lastMessage = lobby.chatMessages[lobby.chatMessages.length - 1];
        for(var key in socketRooms[req.params.lobbyId].clients) {
          // if(key === req.params.clientId) {
          //   continue;
          // }

          var socket = socketRooms[req.params.lobbyId].clients[key];
          socket.send(JSON.stringify(lastMessage));
        }
      }
    );
  });
});

module.exports = router;
