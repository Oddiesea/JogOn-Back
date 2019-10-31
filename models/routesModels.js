const connection = require('../connection');

exports.fetchAllRoutes = ({
  longitude,
  latitude,
  sort_by = 'created_at',
  order = 'desc',
  user_id
}) => {
  return connection('routes')
    .select('*')
    .orderBy(sort_by, order)
    .modify(query => {
      if (longitude && latitude) {
        query
          .where('max_lat', '>=', latitude)
          .andWhere('min_lat', '<=', latitude)
          .andWhere('max_long', '>=', longitude)
          .andWhere('min_long', '<=', longitude);
      }
      if (user_id) {
        query.where({ user_id });
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
