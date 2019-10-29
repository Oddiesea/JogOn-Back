exports.seed = function(connection) {
  return connection.migrate.rollback().then(() => {
    return connection.migrate.latest();
  });
};
