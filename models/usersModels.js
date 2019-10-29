const connection = require('../connection');

exports.fetchAllUsers = () => {
  return connection('users')
    .select('*')
    .then(users => {
      return users;
    });
};

exports.addUser = userObj => {
  return connection('users')
    .insert(userObj, '*')
    .then(([user]) => {
      return user;
    });
};
