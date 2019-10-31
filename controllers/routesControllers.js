const { fetchAllRoutes, addRoute } = require('../models/routesModels');
const { fetchAllFlags } = require('../models/flagsModels');
const { minMaxLatLong, routeFlagger } = require('../utils/utils');
const { addJunctions } = require('../models/junctionsModels');

exports.getAllRoutes = (req, res, next) => {
  fetchAllRoutes(req.query)
    .then(routes => {
      res.status(200).send({ routes });
    })
    .catch(next);
};

exports.postRoute = (req, res, next) => {
  const formattedRoute = minMaxLatLong(req.body);
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
        addJunctions(junctions);
      });
    })
    .catch(next);
};
