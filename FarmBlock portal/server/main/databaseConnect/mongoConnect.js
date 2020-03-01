var MongoClient = require('mongodb').MongoClient;
var keys = require('../config/config').database;

var db = null;
var client = null;

module.exports = {

    connect : ()=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(keys.DATABASE_URI,{useNewUrlParser:true ,useUnifiedTopology: true},(err,client)=>{
                if(err){
                    reject(err);
                }else{
                    db = client.db("dhaankendra");
                    if(db == null){
                        reject("null");
                    }
                    client = client;
                    resolve("successful");
                }
            })
        })
    },

    get : ()=>{
        return db;
    },

    getClient : ()=>{
        return client;
    },

    close : async (client)=>{
        // client.close();
        return true;
    }
};

