const { fetchAllUsers } = require('../models/usersModels');

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers().then(users => {
    res.status(200).send({ users });
  });
};
