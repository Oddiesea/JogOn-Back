const { fetchAllFlags, addFlag } = require('../models/flagsModels');

exports.getAllFlags = (req, res, next) => {
  fetchAllFlags()
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
      });
    })
    .catch(next);
};
