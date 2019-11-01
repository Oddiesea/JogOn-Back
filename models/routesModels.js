const connection = require('../connection');

exports.fetchAllRoutes = ({
  longitude,
  latitude,
  sort_by = 'routes.created_at',
  order = 'desc',
  user_id
}) => {
  return connection
    .select(
      'routes.route_id',
      'poly',
      'length_in_km',
      'min_lat',
      'max_lat',
      'min_long',
      'max_long',
      'routes.user_id',
      'routes.created_at',
      connection.raw('ARRAY_AGG(DISTINCT(flags.flag_type_id)) as flag_type_ids')
    )
    .from('routes')
    .leftJoin('junctions', 'junctions.route_id', 'routes.route_id')
    .leftJoin('flags', 'junctions.flag_id', 'flags.flag_id')
    .groupBy('routes.route_id')
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
        query.where('routes.user_id', user_id);
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
exports.fetchRoute = route_id => {
  return connection('routes')
    .select(
      'routes.route_id',
      'poly',
      'length_in_km',
      'min_lat',
      'max_lat',
      'min_long',
      'max_long',
      'routes.user_id',
      'routes.created_at',
      connection.raw('ARRAY_AGG(DISTINCT(flags.flag_id)) as flag_ids')
    )
    .where('routes.route_id', '=', route_id)
    .leftJoin('junctions', 'junctions.route_id', 'routes.route_id')
    .leftJoin('flags', 'junctions.flag_id', 'flags.flag_id')
    .groupBy('routes.route_id')
    .then(([route]) => {
      if (route) return route;
      else {
        throw { status: 404, msg: 'Item not found.' };
      }
    });
};
exports.removeRoute = route_id => {
  return connection('routes')
    .delete()
    .where({ route_id });
};
