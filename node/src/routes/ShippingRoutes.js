const routes = require('express').Router();
const shippingController = require('../controllers/ShippingController');
routes.post('/add', shippingController.addShipping);
routes.get('/all', shippingController.getAllShipings);
routes.put("/updateshipping/:id",shippingController.updateShipping)
routes.delete("/shipping/:id",shippingController.deleteShipping)
module.exports = routes;