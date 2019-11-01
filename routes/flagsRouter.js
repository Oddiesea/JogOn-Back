const flagsRouter = require('express').Router();
const {
  getAllFlags,
  postFlag,
  getFlag
} = require('../controllers/flagsControllers');
const { handle405s } = require('../errors');

flagsRouter
  .route('/')
  .get(getAllFlags)
  .post(postFlag)
  .all(handle405s);

flagsRouter
  .route('/:flag_id')
  .get(getFlag)
  .all(handle405s);

module.exports = flagsRouter;
