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

  dbMethods.getTweetById = (id, isLike, callback) => {
       //connect to mongo
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection('tweets');
      //check for errors
      assert.equal(null, err);
      //read tweets collections
      collection.find({'content.id' : id}).toArray((err, results) => {
        let numLikes = results[0].content.likes;
        console.log(results, "results");
        if(err) {
          callback(err);
        } else {
          if(isLike === true) {
            numLikes++;
            console.log(numLikes, "numlikes and type", typeof numLikes);
          } else if (isLike === false) {
            numLikes--;
          }
          //send array of results cursor to callback
          //see tweets.js
          callback(null, numLikes);
        }
        db.close();
      });
    });
  }
  dbMethods.updateTweetContentCounter = (id, newCount) => {
     //connect to mongo
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection('tweets');
      //check for errors
      assert.equal(null, err);
      //read tweets collections
      console.log(id, " this is the id\n");
    collection.update({'content.id' : `${id}`},
      { $set: { 'content.likes' : newCount  } }).then(function(data) {
      console.log("im finished");
      db.close();
      });
//    console.log(collection.find({'content.id' : id}).toArray(), "UPDATE");

    });
  }

//     return datab.tweets.sort(function(a, b) { return a.created_at - b.created_at });
// collection.find().toArray((err, results) => {
//    //console.log("results:\n\n", results);
//      console.log("discod");
//      db.close();
//      dbMethods.getTweets = () => {
//    }
// });


module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
