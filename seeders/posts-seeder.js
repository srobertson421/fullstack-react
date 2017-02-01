var mongoose = require('mongoose');
var Post = require('../models/post');

mongoose.connect('mongodb://localhost/fullstackreact');

var posts = [
  {
    title: 'Test Post 1',
    content: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?",
    author: 'srobertson421'
  },
  {
    title: 'Test Post 2',
    content: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?",
    author: 'srobertson421'
  },
  {
    title: 'Test Post 3',
    content: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?",
    author: 'srobertson421'
  },
  {
    title: 'Test Post 4',
    content: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?",
    author: 'srobertson421'
  },
  {
    title: 'Test Post 5',
    content: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?",
    author: 'srobertson421'
  }
];

Post.collection.insert(posts, function(err, posts) {
  if(err) {
    console.log(err);
  } else {
    console.log('Posts Seeded!');
  }
});