const routes = require('express').Router();
const reviewController = require('../controllers/ReviewController');
routes.post('/add', reviewController.addReview);
routes.get('/all', reviewController.getAllReviews);
routes.put("/updatereview/:id",reviewController.updateReview)
routes.delete("/review/:id",reviewController.deleteReview)
module.exports = routes;