"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

  console.log(`connecting to mongo db running at: ${MONGODB_URI}`);

  MongoClient.connect(MONGODB_URI, (err, db) => {

    if (err) {
       console.log('could not connect! Unexpected error. details below.');
       throw err;
   }

   console.log('connected to the db!');
   let collection = db.collection('tweets');
   console.log('retrieving documents for teh tweets collections,');
   collection.find().toArray((err, results) => {
     console.log("results:", results);

     console.log("discod");
     db.close();
   });


});

