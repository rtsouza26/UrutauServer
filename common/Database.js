var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID


export default class Database {

    constructor() {
        if (Database.exists) {
            return Database.instance;
        }
        Database.instance = this;
        Database.exists = true;
        return this;
    }

     url(){
         return "mongodb://localhost:27017/urutau";
     }

     open(callback) {
         mongoClient.connect(this.url(),{ useNewUrlParser: true },function (err, client) {
             console.log('conectado com o banco com sucesso');
             callback(err, client.db("urutau"));
             client.close();
         })
     }


     getObjectID(id) {
         return new ObjectID(id)
     }
  }



