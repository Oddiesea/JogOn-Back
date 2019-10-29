const connection = require('../connection');

exports.fetchAllRoutes = () => {
  return connection('routes')
    .select('*')
    .then(routes => {
      return routes;
    });
};

exports.addRoute = routeObj => {
  return connection('routes')
    .insert(routeObj, '*')
    .then(([route]) => {
      return route;
    });
};
