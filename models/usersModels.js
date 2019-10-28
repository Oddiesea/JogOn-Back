const { connection } = require('../connection');

exports.fetchAllUsers = () => {
  return connection('users')
    .select('*')
    .then(users => {
      return users;
    });
};
