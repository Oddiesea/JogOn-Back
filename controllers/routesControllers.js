const { fetchAllRoutes, addRoute } = require('../models/routesModels');
const { minMaxLatLong } = require('../utils/utils');

exports.getAllRoutes = (req, res, next) => {
  fetchAllRoutes(req.query)
    .then(routes => {
      res.status(200).send({ routes });
    })
    .catch(next);
};

exports.postRoute = (req, res, next) => {
  const formattedRoute = minMaxLatLong(req.body);
  console.log(formattedRoute);
  addRoute(formattedRoute)
    .then(route => {
      res.status(201).send({ route });
    })
    .catch(next);
};
