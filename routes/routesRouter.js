const routesRouter = require('express').Router();
const {
  getAllRoutes,
  postRoute,
  getRoute,
  deleteRoute
} = require('../controllers/routesControllers');
const { handle405s } = require('../errors');

routesRouter
  .route('/')
  .get(getAllRoutes)
  .post(postRoute)
  .all(handle405s);
routesRouter
  .route('/:route_id')
  .get(getRoute)
  .delete(deleteRoute)
  .all(handle405s);
module.exports = routesRouter;
