"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  tweets.post("/like", function(req, res) {
    db.getTweetById(req.body.tweetid, true, (err, val) => {
      if(err) {
        console.log(err);
        throw err;
      }
      db.updateTweetContentCounter(req.body.tweetid, val);
      res.json(val);
    });
  });

   tweets.post("/unlike", function(req, res) {
    db.getTweetById(req.body.tweetid, false, (err, val) => {
      if(err) {
        console.log(err);
        throw err;
      }
      db.updateTweetContentCounter(req.body.tweetid, val);
      res.json(val);
    });
  });


  tweets.get("/", function(req, res) {
    db.getTweets((err, val) => {
    let tweets;
      if(err) {
        console.log(err);
        throw err;
      }
      //results are passed into callback, sorted and set to tweets variable
      tweets = val.sort(function(a, b) { return a.created_at - b.created_at });;
      res.json(tweets);
    });
  });

  tweets.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }
    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        id: User.generateUniqueId(),
        text: req.body.text,
        likes: 0
      },
      created_at: Date.now()
    };
    db.saveTweet(tweet);
    return res.send();
  });


  return tweets;

}
