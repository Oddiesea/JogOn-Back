const { fetchAllFlags } = require('../models/flagsModels');

exports.getAllFlags = (req, res, next) => {
  fetchAllFlags().then(flags => {
    res.status(200).send({ flags });
  });
};
