const routes = require('express').Router();
const hordingController = require('../controllers/HordingController');
routes.post('/add', hordingController.addHording);
routes.get('/all', hordingController.getAllHordings);
routes.post('/addwithfile', hordingController.addHordingWithFile);
module.exports = routes;