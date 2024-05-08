//import userSchema or Model
const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken') //for token

//Register Logic
exports.register = async(req,res)=>{
    console.log("Inside register methood"); //eth ivde veno??
    const{username,email,password}=req.body
    console.log(username,email,password);
    try{

        //check if email is alreaddy registered
        const existingUser= await users.findOne({email})
        console.log(existingUser);

        if(existingUser){
            res.status(406).json("User already registred")
        }
        else{
            const newUser= new users({
                username,
                email,
                password,
                github:"",
                livelink:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    }

    catch(err){
        res.status(500).json("Register failed...")
    }
}



//login logic
exports.login= async(req,res)=>{
    const {email,password}=req.body
    try{
        const existingUser =await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},"super2024")  //jwt aanu token nte sanaam 
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json("invalid email or password")
        }
    }
    catch(err){
        res.status(500).json("Register failed..."+err)
    }
    
}