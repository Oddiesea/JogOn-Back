const { fetchAllFlags, addFlag } = require('../models/flagsModels');

exports.getAllFlags = (req, res, next) => {
  fetchAllFlags().then(flags => {
    res.status(200).send({ flags });
  });
};

exports.postFlag = (req, res, next) => {
  addFlag(req.body)
    .then(flag => {
      res.status(201).send({ flag });
    })
    .catch(next);
};
