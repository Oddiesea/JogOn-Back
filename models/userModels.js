const {connection} = require("../connection");

exports.getAllUsers = () => {
  return connection("routes")
    .select("*")
    .then(data => {
      return data;
    });
};
