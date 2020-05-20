const MongoClient = require('mongodb').MongoClient;

let dbConnection = null;
class DB {

    constructor() {
        this.uri = "mongodb+srv://admin:admin@todocluster-1qdma.mongodb.net/test?retryWrites=true&w=majority";
        this._db = dbConnection;
    }
    async initDB() {

    return new Promise(async (resolve, reject) => {
        if (this._db) {
            console.log("Database is already initialised");
            return resolve(this._db);
        }
        try {
          const client = await MongoClient.connect(this.uri, { useNewUrlParser: true });
          this._db = client.db('todoApp')
          dbConnection = this._db;
          resolve(this._db);   
        } catch (error) {
            reject(error);   
        }
        });
        
      
    }
    
    getDbConnection() {
        if (!this._db) {
            throw Error("Database not initialized");
        }
        console.log(this._db)
        return this._db;
    }

    getCollection(collectionName) {
        console.log(collectionName);
        if (!this._db) {
            throw Error("Database not initialized");
            return null;
        }
        return this._db.collection(collectionName);
    }

}

module.exports = DB;