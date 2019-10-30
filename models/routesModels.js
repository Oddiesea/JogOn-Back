const connection = require('../connection');

exports.fetchAllRoutes = ({ longitude, latitude }) => {
  return connection('routes')
    .select('*')
    .modify(query => {
      if (longitude && latitude) {
        query
          .where('max_lat', '>=', latitude)
          .andWhere('min_lat', '<=', latitude)
          .andWhere('max_long', '>=', longitude)
          .andWhere('min_long', '<=', longitude);
      }
    })
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
