//1 Loads .env file contents into process.env by defalut
require('dotenv').config()

//2 imprt express
const express= require('express')
//3 import cors
const cors= require('cors')

//7 import DB
const db=require('./DB/connection')

//8 import router
const router=require('./Routes/router')

//11 import applicationmiddleware
// const applicationMiddleware = require('./Middlewares/applicationMiddleware')

//4 create a application using express pf (project fair)
const pfserver =express()

//5use 
pfserver.use(cors())
pfserver.use(express.json())    //return middleware that only parses (cross check the requset in between FE and BE)

//10 use middleware
// pfserver.use(applicationMiddleware)

//9 use router
pfserver.use(router)

//12 To view image in Front end or to export image from back end
pfserver.use('/uploads',express.static('./uploads'))

//6 port creation
const PORT= 4000 || process.env.PORT  //to run on any other port otherthan 4000

pfserver.listen(PORT,()=> {
    console.log('pfserver listining on port'+PORT);
})

pfserver.get('/',(req,res)=>{
    res.send("Welcome to project fair")
})
