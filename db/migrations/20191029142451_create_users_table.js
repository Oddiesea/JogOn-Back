exports.up = function(connection) {
  return connection.schema.createTable('users', usersTable => {
    usersTable.increments('user_id').primary();
    usersTable.string('username').notNullable();
  });
};

exports.down = function(connection) {
  return connection.schema.dropTable('users');
};
