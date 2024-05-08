//1 import mongoose

const mongoose =require('mongoose')

//2schema creation
const projectSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        
    },
    github:{
        type:String,
        required:true
    },
    livelink:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    projectimage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
         required:true
    }

})

//3 create model

const project=mongoose.model('project',projectSchema)
module.exports=project