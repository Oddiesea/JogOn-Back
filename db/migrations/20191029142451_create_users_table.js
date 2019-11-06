exports.up = function(connection) {
  return connection.schema.createTable('users', usersTable => {
    usersTable
      .string('user_id')
      .primary()
      .notNullable();
  });
};

exports.down = function(connection) {
  return connection.schema.dropTable('users');
};
