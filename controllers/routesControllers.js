const { fetchAllRoutes, addRoute } = require('../models/routesModels');

exports.getAllRoutes = (req, res, next) => {
  fetchAllRoutes(req.query)
    .then(routes => {
      res.status(200).send({ routes });
    })
    .catch(next);
};

exports.postRoute = (req, res, next) => {
  addRoute(req.body)
    .then(route => {
      res.status(201).send({ route });
    })
    .catch(next);
};
