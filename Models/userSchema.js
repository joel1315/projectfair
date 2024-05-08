//Schema maps to mongodb collection

//1 import mongoose
const mongoose= require('mongoose')

//2schema creation
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    livelink:{
        type:String
    },
    profile:{
        type:String
    }


})

//3 create modal
const user = mongoose.model('user',userSchema)
module.exports=user