const { fetchAllRoutes } = require('../models/routesModels');

exports.getAllRoutes = (req, res, next) => {
  fetchAllRoutes().then(routes => {
    res.status(200).send({ routes });
  });
};
