const { fetchAllFlags, addFlag } = require('../models/flagsModels');
const { fetchAllRoutes } = require('../models/routesModels');
const { addJunctions } = require('../models/junctionsModels');
const { routeFlagger, minMaxLatLong } = require('../utils/utils');

exports.getAllFlags = (req, res, next) => {
  const region = minMaxLatLong(req.query);
  fetchAllFlags(region)
    .then(flags => {
      res.status(200).send({ flags });
    })
    .catch(next);
};

exports.postFlag = (req, res, next) => {
  addFlag(req.body)
    .then(flag => {
      res.status(201).send({ flag });
      fetchAllRoutes({
        longitude: flag.longitude,
        latitude: flag.latitude
      }).then(routes => {
        const junctions = routes.map(route => {
          if (routeFlagger(flag, route)) {
            return { flag_id: flag.flag_id, route_id: route.route_id };
          }
        });
        return addJunctions(junctions);
      });
    })
    .catch(next);
};
