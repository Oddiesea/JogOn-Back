const {
  fetchAllFlags,
  addFlags,
  fetchFlag,
  removeFlag
} = require('../models/flagsModels');
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

exports.postFlags = (req, res, next) => {
  const { flags } = req.body;
  addFlags(flags)
    .then(flags => {
      res.status(201).send({ flags });
      flags.forEach(flag => {
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
      });
    })
    .catch(next);
};

exports.getFlag = (req, res, next) => {
  fetchFlag(req.params.flag_id)
    .then(flag => {
      res.status(200).send({ flag });
    })
    .catch(next);
};

exports.deleteFlag = (req, res, next) => {
  removeFlag(req.params.flag_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
