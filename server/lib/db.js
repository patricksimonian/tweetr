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
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection('tweets');
      assert.equal(null, err);
      collection.find().toArray((err, results) => {
        if(err) {
          callback(err);
        } else {
          callback(null, results);
        }
        db.close();
      });
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
