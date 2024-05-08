const project =require('../Models/projectSchema')


//add project logic
exports.addProject =async(req,res)=>{
    console.log("Inside the addproject methood");
    const {title,language,github,livelink,overview,}=req.body
    const projectimage =req.file.filename
    const userId =req.payload
    console.log(title,language,github,livelink,overview,projectimage);
    console.log(userId);

    try{
        const existingProject =await project.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist")
        }
        else{
           const newProject =new project({title,language,github,livelink,overview,projectimage,userId})
           await newProject.save()
           
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
    
}



//Get a Particular project
exports.getAProject= async(req,res)=>{
    console.log("inside get a project");
    const userId = req.payload
    console.log(userId);
    try{
        const AProject = await project.find({userId})
        console.log(AProject);
        if(AProject){
            res.status(200).json(AProject)
           
        }
        else{
            res.status(401).json("can't find project ")
        }
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}




//Get three project details for home page
exports.getHomeProjects= async(req,res)=>{
    try{
        const HomeProject=await project.find().limit(3)
        if(HomeProject){
            res.status(200).json(HomeProject)
        }
        else{
            res.status(401).json("Can't find project")
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}


//Get all project details
exports.getAllUserProjects= async(req,res)=>{
    
     const searchKey =req.query.search
     console.log(searchKey);  //4 search nte codes

     let query ={}
     if(searchKey){
        query.language={ $regex :searchKey, $options :"i"} // 5 search nte code 
     }

    try{
        const AllUserProjects= await project.find(query) // 6 ee query um search nte code 
        if(AllUserProjects){
            res.status(200).json(AllUserProjects)
        }
        else{
            res.status(401).json("Can't find project")
        }
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}


//delete a project
exports.deleteUserProject = async(req,res)=>{
    const {pid} =req.params //get project id
    try{
        const deleteUserProject = await project.findOneAndDelete({_id:pid}) //findOneAndDelete:find one and delete also display the rest on frontend
        res.status(200).json(deleteUserProject) 
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

// upddate user project
exports.updateUserProject = async (req,res)=>{
    const{title,language,github,livelink,overview,projectimage} =req.body
    userId =req.payload
    const {pid}= req.params
    const uploadImage = req.file?req.file.filename:projectimage

    try{
        const updateProject =await project.findByIdAndUpdate({_id:pid},{title,language,github,livelink,overview,
            projectimage:uploadImage,userId})
            await updateProject.save()
            res.status(200).json(updateProject)

    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}
