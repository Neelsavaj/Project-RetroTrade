const routes = require('express').Router();
const cartController = require('../controllers/CartController');
routes.post('/add', cartController.addCart);
routes.get('/all', cartController.getAllCart);
routes.put("/updatecart/:id",cartController.updateCart)
routes.delete("/cart/:id",cartController.deleteCart)
routes.get('/getcartbyuserid/:userid',cartController.getCartByUserId)

module.exports = routes;    