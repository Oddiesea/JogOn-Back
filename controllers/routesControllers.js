const {
  fetchAllRoutes,
  addRoute,
  fetchRoute,
  removeRoute
} = require('../models/routesModels');
const { fetchAllFlags } = require('../models/flagsModels');
const { routeFlagger, routeAreaFinder } = require('../utils/utils');
const { addJunctions } = require('../models/junctionsModels');

exports.getAllRoutes = (req, res, next) => {
  fetchAllRoutes(req.query)
    .then(routes => {
      res.status(200).send({ routes });
    })
    .catch(next);
};

exports.postRoute = (req, res, next) => {
  const formattedRoute = routeAreaFinder(req.body);
  addRoute(formattedRoute)
    .then(route => {
      res.status(201).send({ route });
      fetchAllFlags({
        min_lat: route.min_lat,
        max_lat: route.max_lat,
        min_long: route.min_long,
        max_long: route.max_long
      }).then(flags => {
        const junctions = flags.map(flag => {
          if (routeFlagger(flag, route)) {
            return { flag_id: flag.flag_id, route_id: route.route_id };
          }
        });
        return addJunctions(junctions);
      });
    })
    .catch(next);
};
exports.getRoute = (req, res, next) => {
  fetchRoute(req.params.route_id)
    .then(route => {
      res.status(200).send({ route });
    })
    .catch(next);
};
exports.deleteRoute = (req, res, next) => {
  removeRoute(req.params.route_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
