const routes = require('express').Router();
const paymentController = require('../controllers/PaymentController');
routes.post('/add', paymentController.addPayment);
routes.get('/all', paymentController.getAllPayments);
routes.put("/updatepayment/:id",paymentController.updatePayment)
routes.delete("/payment/:id",paymentController.deletePayment)
module.exports = routes;