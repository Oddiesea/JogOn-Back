const connection = require('../connection');

exports.fetchAllRoutes = () => {
  return connection('routes')
    .select('*')
    .then(routes => {
      return routes;
    });
};
