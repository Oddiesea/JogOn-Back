const routesRouter = require('express').Router();
const { getAllRoutes, postRoute } = require('../controllers/routesControllers');
const { handle405s } = require('../errors');

routesRouter
  .route('/')
  .get(getAllRoutes)
  .post(postRoute)
  .all(handle405s);

module.exports = routesRouter;
