const { fetchAllFlagTypes, addFlagType } = require('../models/flagTypesModels');

exports.getAllFlagTypes = (req, res, next) => {
  fetchAllFlagTypes()
    .then(flagTypes => {
      res.status(200).send({ flagTypes });
    })
    .catch(next);
};

exports.postFlagType = (req, res, next) => {
  addFlagType(req.body)
    .then(flagType => {
      console.log(flagType);
      res.status(201).send({ flagType });
    })
    .catch(next);
};
