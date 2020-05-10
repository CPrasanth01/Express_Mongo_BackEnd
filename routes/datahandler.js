const express= require('express')
var router = express.Router();

const dbConnection = require('../db')
var data = [];

//GET ALL
router.get('/input',(req,res,next)=>{
    console.log("Routing work");
    var db = dbConnection.getDbConnection().collection('todo');
    db.find()
    .forEach(todoData => {
        data.push(todoData);
        console.log(todoData);
    })
    .then(result => {
        res.status(200).json(data);
    })
    .catch(
        err =>{
            console.log(err)
        })
})

//INSERT DATA
router.post('/posts',(req,res,next) => {

    console.log(req.body);
    var todoConnect = dbConnection.getDbConnection().collection('todo');
    todoConnect.insertOne(req.body)
    .then(result => {
        console.log("Done");
        res.status(200).json({message:'Data inserted' , insertedId : result.insertedId});
})
.catch(
    err =>{
        console.log(err)
    })
})

//UPDATE ONE
router.post('/update',(req,res,next) => {
    console.log(req.body);
    var todoConnect = dbConnection.getDbConnection().collection('todo');
    todoConnect.updateOne({name : req.body.name},{$set : req.body}).then(result => {
        res.status(200).json({message: "Data inserted successfully" , id : result.insertedId})
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: "Error Occurred while updating"})
    })
})

//DELETE ONE
router.delete('/delete' ,(req,res,next) => {
    console.log(req.body);
    var todoConnect = dbConnection.getDbConnection().collection('todo');
    todoConnect.deleteOne({name:req.body.name}).then(result => {
        console.log(result);
        res.status(200).json({message : "Deletion successful",result:result.requestId});
    }).catch(err => {
        console.log(err);
        res.status(500).json({message:"Delete Operation Failed"});
    })
})

//IMPLEMENTING PAGINATION
router.get('/page',(req,res,next) => {
const queryPage = req.query.size;
const pageSize =1;
var paginatedData=[];
console.log(req.query);
var todoConnect = dbConnection.getDbConnection().collection('todo');
todoConnect.find()
.sort({ name : -1})      // Sorting the data asc or desc 
.skip( (queryPage - 1) * pageSize)      // Skip no of elements 
.limit(pageSize)     // no of elements should be sent to user
.forEach(todoData => {
    paginatedData.push(todoData);
    console.log(paginatedData);
  })    
.then(result => {
    console.log(paginatedData);
    res.status(200).json(paginatedData);
}).catch(err => {
    console.log(err);
    res.status(500).json({message:"Delete Operation Failed"});
})
})

//COUNT
router.get('/count/:text',(req,res,next) =>{
    console.log(req.params.name);
    const ip = req.params.name
    var todoConnect = dbConnection.getDbConnection().collection('todo');
    todoConnect.find().count()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: "Error Occurred"})
    })
})

//FIND ONE
router.get('/:name',(req,res,next) => {
    console.log(req.params.name);
    var todoConnect = dbConnection.getDbConnection().collection('todo');
    todoConnect.findOne({
        name:req.params.name}).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json({message: "Error Occurred"})
    })
})

module.exports= router