exports.up = function(connection) {
  return connection.schema.createTable('routes', routesTable => {
    routesTable.increments('route_id').primary();
    routesTable.text('poly').notNullable();
    routesTable.float('length_in_km').notNullable();
    routesTable
      .integer('user_id')
      .references('user_id')
      .inTable('users')
      .notNullable();
    routesTable.timestamp('created_at').defaultTo(connection.fn.now());
    routesTable.specificType('latitude', 'double precision').notNullable();
    routesTable.specificType('longitude', 'double precision').notNullable();
    routesTable.specificType('lat_delta', 'double precision').notNullable();
    routesTable.specificType('long_delta', 'double precision').notNullable();
  });
};

exports.down = function(connection) {
  return connection.schema.dropTable('routes');
};
