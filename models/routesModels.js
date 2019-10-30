const connection = require('../connection');

exports.fetchAllRoutes = ({ longitude, latitude }) => {
  return connection('routes')
    .select('*')
    .modify(query => {
      if (longitude && latitude) {
        query.where('longitude', '>', longitude);
      }
    })
    .then(routes => {
      console.log(routes);
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
