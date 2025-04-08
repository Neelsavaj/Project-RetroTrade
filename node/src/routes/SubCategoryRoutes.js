const routes = require('express').Router();
const subcategoryController =require('../controllers/SubCategoryController')
routes.post("/addsubcategory", subcategoryController.addSubCategory);
routes.get("/getallsubcategory", subcategoryController.getAllSubCategory);
routes.get("/getsubcategorybycategory/:categoryId",subcategoryController.getSubCategoryByCategoryId)
module.exports = routes;    