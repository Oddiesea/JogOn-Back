const flagTypesRouter = require('express').Router();
const {
  getAllFlagTypes,
  postFlagType
} = require('../controllers/flagTypesControllers');
const { handle405s } = require('../errors');

flagTypesRouter
  .route('/')
  .get(getAllFlagTypes)
  .post(postFlagType)
  .all(handle405s);

module.exports = flagTypesRouter;
