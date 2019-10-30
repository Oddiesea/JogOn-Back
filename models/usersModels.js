const connection = require('../connection');

exports.fetchAllUsers = () => {
  return connection('users')
    .select('*')
    .then(users => {
      return users;
    });
};

// exports.fetchUserById = user_id => {
//   return connection('users').select('*').where('user_id', user_id)
// }

exports.addUser = userObj => {
  return connection('users')
    .insert(userObj, '*')
    .then(([user]) => {
      return user;
    });
};
