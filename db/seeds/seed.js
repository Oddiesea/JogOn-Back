const {
  users,
  flags,
  flag_types,
  routes,
  junctions
} = require('../data/index');

exports.seed = function(connection) {
  return connection.migrate
    .rollback()
    .then(() => {
      return connection.migrate.latest();
    })
    .then(() => {
      const usersInsertions = connection('users').insert(users);
      const flag_typesInsertions = connection('flag_types').insert(flag_types);
      return Promise.all([usersInsertions, flag_typesInsertions]);
    })
    .then(() => {
      const flagsInsertions = connection('flags').insert(flags);
      const routesInsertions = connection('routes').insert(routes);
      return Promise.all([flagsInsertions, routesInsertions]);
    })
    .then(() => {
      return connection('junctions').insert(junctions);
    });
};
