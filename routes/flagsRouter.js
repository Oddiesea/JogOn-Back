const flagsRouter = require('express').Router();
const {
  getAllFlags,
  postFlag,
  getFlag,
  deleteFlag
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
  .delete(deleteFlag)
  .all(handle405s);

module.exports = flagsRouter;
