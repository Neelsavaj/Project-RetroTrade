const routes = require('express').Router();
const stateController = require('../controllers/StateColtroller');
routes.post("/addstate", stateController.addState);
routes.get("/getallstates", stateController.getAllStates);
module.exports = routes;