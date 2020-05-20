const express= require('express')
var router = express.Router();

const db = require('../db')

var getTodoCollection = (collectionName) => {
    const dbConnection = new db();
    return dbConnection.getCollection(collectionName);
} 



//Collection from DB will return cursors not pointers
//GET ALL
router.get('/todo', async (req, res, next)=>{
    console.log("Routing work");
    try {
        const todos = await getTodoCollection('todo').find().toArray();
        res.status(200).json(todos);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Error while Retriving"})
    }
});

//INSERT DATA
router.post('/todo',async (req,res,next) => {

    console.log(req.body);
    try{
        const result  = await getTodoCollection('todo').insertOne(req.body);
        res.status(200).json({message:'Data inserted' , insertedId : result.insertedId});
    } catch (e){
        console.log(e);
        res.status(500).json({message: "Error while Inserting"})
    }
});

//UPDATE ONE
router.patch('/todo/:name',async (req,res,next) => {
    console.log(req.query.name);
    try{
        const  result = await getTodoCollection('todo').updateOne({name : req.body.name},{$set : req.body});
        res.status(200).json({message: "Data inserted successfully" , id : result.insertedId})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Error Occurred while updating"})
    }
});

//DELETE ONE
router.delete('/delete/:id' ,async (req,res,next) => {
    console.log(req.params.id);
    try {
        const result = await getTodoCollection('todo').deleteOne({name:req.params.id});
        res.status(200).json({message : "Deletion successful",result:result.requestId});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Delete Operation Failed"});
    }
});

//IMPLEMENTING PAGINATION
router.get('/page',async (req,res,next) => {
const queryPage = req.query.size;
const pageSize =1;
console.log(req.query);

try {

    const result = await
     getTodoCollection('todo').find()
     .sort({ name : -1})      // Sorting the data asc or desc 
     .skip( (queryPage - 1) * pageSize)      // Skip no of elements 
     .limit(pageSize)   // no of elements should be sent to user   
     .toArray()  ; 
     res.status(200).json(result);

} catch(e){
    console.log(e);
    res.status(500).json({message:"Delete Operation Failed"});
}
});

//COUNT
router.get('/count/:text',async (req,res,next) =>{
    console.log(req.params.name);

    try {
        const result =await getTodoCollection('todo').find().count();
        res.status(200).json(result);
    } catch(e){
        console.log(e);
        res.status(500).json({message: "Error Occurred"});
    }
});

//FIND ONE
router.get('/todo/:name',async (req,res,next) => {
    console.log(req.params.name);
    try {
        const result = await getTodoCollection('todo').findOne({name:req.params.name});
        res.status(200).json(result)
    } catch (e){
        console.log(e);
        res.status(500).json({message: "Error Occurred"})
    }
});

module.exports= router