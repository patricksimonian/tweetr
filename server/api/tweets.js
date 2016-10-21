"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  tweets.get("/", function(req, res) {
    let tweets;
    db.getTweets((err, val) => {
      if(err) {
        console.log(err);
        throw err;
      }
      tweets = val.sort(function(a, b) { return a.created_at - b.created_at });;
    });
    // simulate delay
    setTimeout(() => {
      return res.json(tweets);
    }, 300);
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
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.saveTweet(tweet);
    return res.send();
  });

  return tweets;

}
