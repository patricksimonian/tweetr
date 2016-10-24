"use strict";

//const initialTweets = require("./tweets.json");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";
const assert = require('assert');
const dbMethods = {};

  dbMethods.saveTweet = (data) => {
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection('tweets');
      assert.equal(null, err);
      console.log(`connecting to mongo db running at: ${MONGODB_URI}`);
      collection.insertOne(data, function (err, r) {
        assert.equal(null, err);
        db.close();
      });
    });
    return true;
  }

  dbMethods.getTweets = (callback) => {
    //connect to mongo
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection('tweets');
      //check for errors
      assert.equal(null, err);
      //read tweets collections
      collection.find().toArray((err, results) => {
        if(err) {
          callback(err);
        } else {
          //send array of results cursor to callback
          //see tweets.js
          callback(null, results);
        }
        db.close();
      });
   });
  }
  //grabs a singular tweet from the database by query of its ID which is stored
  //as a data attribute on the specific tweets section element on client
  dbMethods.getTweetById = (id, isLike, callback) => {
       //connect to mongo
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection('tweets');
      //check for errors
      assert.equal(null, err);
      //read tweets collections
      collection.find({'content.id' : id}).toArray((err, results) => {
        let numLikes = results[0].content.likes;
        if(err) {
          callback(err);
        } else {
          if(isLike === true) {
            numLikes++;
          } else if (isLike === false) {
            numLikes--;
          }
          callback(null, numLikes);
        }
        db.close();
      });
    });
  }
  //updates database  with the new num  of likes for specfic tweet object
  dbMethods.updateTweetContentCounter = (id, newCount) => {
     //connect to mongo
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection('tweets');
      //check for errors
      assert.equal(null, err);
      //read tweets collections
    collection.update({'content.id' : `${id}`},
      { $set: { 'content.likes' : newCount  } }).then((data) => {
      db.close();
      });

    });
  }




module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
