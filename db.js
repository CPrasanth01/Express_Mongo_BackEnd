const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@todocluster-1qdma.mongodb.net/test?retryWrites=true&w=majority";
let _db;

const initDB = callback => {
    if(_db){
        console.log("Database is already initialised");
        return callback(null, _db);
    }
    MongoClient.connect(uri,{ useNewUrlParser: true }).then(client =>{
        _db = client.db('todoApp');
        callback(null,_db);
    }).catch(err => {
        callback(err);
    })
   
}
const getDbConnection =() =>{
    if(!_db){
       throw Error("Database not initialized");
    }
    return _db;
}

module.exports = {
    initDB,
    getDbConnection
}