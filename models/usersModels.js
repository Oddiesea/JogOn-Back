const connection = require('../connection');

exports.addUser = userObj => {
  return connection('users')
    .insert(userObj, '*')
    .then(([user]) => {
      return user;
    });
};
