const { fetchAllFlagTypes } = require('../models/flagTypesModels');

exports.getAllFlagTypes = (req, res, next) => {
  fetchAllFlagTypes().then(flagTypes => {
    res.status(200).send({ flagTypes });
  });
};
