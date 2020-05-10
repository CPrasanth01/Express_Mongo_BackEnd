const express= require('express')
var cors = require('cors')
const dbConnection = require('./db')
const datahandler =require('./routes/datahandler')
const auth =require('./routes/auth')
const app = express()
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(cors()); // To avoid cross domain access

app.use('/input', datahandler);
app.use('/login',auth);

const port = 3001
dbConnection.initDB((err,db) =>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
    }
});
