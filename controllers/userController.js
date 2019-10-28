const { getAllUsers } = require("../models/userModels");

exports.fetchAllUsers = (req, res, next) => {
  getAllUsers().then(userData => console.log(userData));
};
