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
    routesTable.specificType('min_lat', 'double precision').notNullable();
    routesTable.specificType('max_lat', 'double precision').notNullable();
    routesTable.specificType('min_long', 'double precision').notNullable();
    routesTable.specificType('max_long', 'double precision').notNullable();
  });
};

exports.down = function(connection) {
  return connection.schema.dropTable('routes');
};
