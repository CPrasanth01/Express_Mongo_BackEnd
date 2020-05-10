const express= require('express')
var router = express.Router();
const dbConnection = require('../db')

//SIGN UP USERS
router.post('/signup',(req,res,next) => {
    const userName = req.body.id;
    const passCode = req.body.pwd;

    
        var todoConnect = dbConnection.getDbConnection().collection('users');
        todoConnect.insertOne({userId: userName, password:passCode})
        .then(result => {
            console.log(result);
            // const token = createToken();
            res.status(201).json({message: "UserId Added and Authenticated successfully"});
        })
        .catch(err =>{
            console.log(err);
            res.status(401).json({message: "Authentication Failed, Username Exists"})
        })   
})

//LOGIN
router.post('/login',(req,res,next) => {
    const userName = req.body.id;
    const passCode = req.body.pwd;
    // const token = createToken();
    var todoConnect = dbConnection.getDbConnection().collection('users');
    todoConnect.findOne({userId:userName})
    .then(result => {
        return (passCode == result.password)
    })
    .then(result => {
        if(result){
            res.status(201).json({message: "UserId Authenticated successfully"});
        }else{
            res.status(401).json({message: "UserId Authenticated Failed"});
        }   
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({message: "Authentication Failed, Invalid username or password"})
    })

})
module.exports= router