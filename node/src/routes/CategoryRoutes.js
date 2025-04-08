const routes = require('express').Router();
const CategoryController =require('../controllers/CategoryController')
routes.post("/addcategory", CategoryController.addCategory);
routes.get("/getallcategory", CategoryController.getAllCategory);
module.exports = routes;