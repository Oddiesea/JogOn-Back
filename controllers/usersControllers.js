const { addUser } = require('../models/usersModels');

exports.postUser = (req, res, next) => {
  addUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};
