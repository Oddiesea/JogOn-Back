exports.up = function(connection) {
  return connection.schema.createTable('flag_types', flagTypesTable => {
    flagTypesTable.increments('flag_type_id').primary();
    flagTypesTable.string('flag_type').notNullable();
  });
};

exports.down = function(connection) {
  return connection.schema.dropTable('flag_types');
};
