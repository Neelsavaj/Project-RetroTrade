const routes = require('express').Router();
const orderController = require('../controllers/OrderController');
routes.post('/add', orderController.addOrder);
routes.get('/all', orderController.getAllOrders);
routes.put("/updateorder/:id",orderController.updateOrder)
routes.delete("/order/:id",orderController.deleteOrder)
module.exports = routes;    