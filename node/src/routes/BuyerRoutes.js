const routes = require('express').Router();
const buyerController = require('../controllers/BuyerColtroller');
routes.post('/add', buyerController.addBuyer);
routes.get('/all', buyerController.getAllBuyers);
routes.post('/addwithfile', buyerController.addBuyerWithFile);
routes.get("/getallbuyersbyuserid/:userId", buyerController.getAllBuyersByUserId)
routes.put("/updatebuyer/:id",buyerController.updateBuyer)
routes.get('/getbuyerbyid/:id',buyerController.getBuyerById)
module.exports = routes;