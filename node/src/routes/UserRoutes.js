//router
const routes = require("express").Router()
const userController = require("../controllers/UserController")
const { db } = require("../models/UserModel")
routes.post("/user",userController.signup)
routes.post("/users/login",userController.loginUser)
routes.get("/users",userController.getAllUsers)
// routes.post("/user",userController.addUser)
routes.delete("/user/:id",userController.deleteUser)
routes.get("/user/:id",userController.getUserById)
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetpassword)

module.exports = routes