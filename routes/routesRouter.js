const routesRouter = require('express').Router();
const { getAllRoutes } = require('../controllers/routesControllers');

routesRouter.route('/').get(getAllRoutes);

module.exports = routesRouter;
