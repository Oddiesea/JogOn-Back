exports.up = function(connection) {
  return connection.schema.createTable('flags', flagsTable => {
    flagsTable.increments('flag_id').primary();
    flagsTable.float('latitude').notNullable();
    flagsTable.float('longitude').notNullable();
    flagsTable
      .integer('user_id')
      .references('user_id')
      .inTable('users')
      .notNullable();
    flagsTable
      .integer('flag_type_id')
      .references('flag_type_id')
      .inTable('flag_types')
      .notNullable();
    flagsTable.timestamp('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function(connection) {
  return connection.schema.dropTable('flags');
};
