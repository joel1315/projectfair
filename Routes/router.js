const express =require('express')

const userController = require('../Controllers/userController')

const projectController=require('../Controllers/projectController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerConfig=require('../Middlewares/multerMiddleware')

const router = express.Router()

//Api call for register

router.post('/register',userController.register)

//api call for login

router.post('/login', userController.login)

//api call for addproject

router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProject)


//api call to get one project
router.get('/project/get-auser-project',jwtMiddleware,projectController.getAProject)

//api call to get 3 project
router.get('/project/home-project',projectController.getHomeProjects)

//api call to get all user projects
router.get('/project/all-user-project',jwtMiddleware,projectController.getAllUserProjects)


//api call to delete a project
router.delete('/project/delete-user-project/:pid',jwtMiddleware,projectController.deleteUserProject)

//update user project
router.put('/project/update-user-project/:pid',jwtMiddleware,multerConfig.single('projectimage'),projectController.updateUserProject)


module.exports= router




