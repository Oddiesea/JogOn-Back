const {
  fetchAllUsers,
  fetchUserById,
  addUser
} = require('../models/usersModels');

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const user_id = req.params.user_id;
  fetchUserById(user_id).then(user => {
    // console.log(user);
  });
};

exports.postUser = (req, res, next) => {
  addUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};
