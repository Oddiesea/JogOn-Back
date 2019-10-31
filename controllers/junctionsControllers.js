const {
  fetchAllJunctions,
  addJunctions
} = require('../models/junctionsModels');

exports.getAllJunctions = (req, res, next) => {
  fetchAllJunctions().then(junctions => {
    res.status(200).send({ junctions });
  });
};

exports.postJunctions = (req, res, next) => {
  addJunctions(req.body.junctions).then(junctions => {
    res.status(201).send({ junctions });
  });
};
