const express= require('express')
var cors = require('cors')
const DB = require('./db')
const todo =require('./routes/todo')
const auth =require('./routes/auth')
const app = express()
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(cors()); // To avoid cross domain access

app.use('/todo', todo);
app.use('/auth',auth);

const port = 3001
const dB = new DB();

(async () => {
    try {
        const db = await dB.initDB();
        app.set("db",db);
        console.log('connected')
        app.listen(port)
    } catch(e) {
        console.log('db failed', e);
    }
})();

