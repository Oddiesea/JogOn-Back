exports.up = function(connection) {
  return connection.schema.createTable('junctions', junctionsTable => {
    junctionsTable.increments('junction_id').primary();
    junctionsTable
      .integer('flag_id')
      .references('flag_id')
      .inTable('flags')
      .notNullable()
      .onDelete('CASCADE');
    junctionsTable
      .integer('route_id')
      .references('route_id')
      .inTable('routes')
      .notNullable()
      .onDelete('CASCADE');
  });
};

exports.down = function(connection) {
  return connection.schema.dropTable('junctions');
};
