const routes = require('express').Router();
const productController =require('../controllers/ProductController')
routes.post("/addproduct", productController.addProduct);
routes.get("/getallproduct", productController.getAllProduct);
routes.put("/updateproduct/:id",productController.updateProduct)
routes.delete("/product/:id",productController.deleteProduct)
routes.get('/getProductsbyuserid/:userId', productController.getAllProductsByUserId);
routes.get('/getProductsbycategoryid/:categoryId', productController.getProductByCategoryId);
routes.post('/addWithFile', productController.addProductWithFile);
routes.get("/getProductById/:id",productController.getProductById);

module.exports = routes;
