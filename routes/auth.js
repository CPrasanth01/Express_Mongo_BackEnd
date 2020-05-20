const express= require('express')
var router = express.Router();
const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

var getUserCollection = () => {
    const dbConnection = new db();
    return dbConnection.getCollection('users')
}

//SIGN UP USERS
router.post('/signup',(req,res,next) => {
    const userName = req.body.id;
    const passCode = req.body.pwd;
    let encryptedPwd;
    bcrypt.hash(passCode,saltRounds).then(hashPw =>{
        encryptedPwd = hashPw;
    
    console.log(encryptedPwd);
    getUserCollection().insertOne({userId: userName, password:encryptedPwd})
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
})

//LOGIN
router.post('/login',(req,res,next) => {
    const userName = req.body.id;
    const passCode = req.body.pwd;
    // const token = createToken();
    getUserCollection().findOne({userId:userName})
    .then(result => {
        return ( bcrypt.compare(passCode,result.password))
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