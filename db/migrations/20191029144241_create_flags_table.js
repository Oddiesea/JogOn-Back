exports.up = function(connection) {
  return connection.schema.createTable('flags', flagsTable => {
    flagsTable.increments('flag_id').primary();
    flagsTable.specificType('latitude', 'double precision').notNullable();
    flagsTable.specificType('longitude', 'double precision').notNullable();
    flagsTable
      .string('user_id')
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
