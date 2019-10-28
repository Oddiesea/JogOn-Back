const { fetchAllFlags, addFlag } = require('../models/flagsModels');

exports.getAllFlags = (req, res, next) => {
  fetchAllFlags().then(flags => {
    res.status(200).send({ flags });
  });
};

exports.postFlag = (req, res, next) => {
  addFlag(req.body).then(addedFlag => {
    console.log(addedFlag);
  });
};
