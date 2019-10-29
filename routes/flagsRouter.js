const flagsRouter = require('express').Router();
const { getAllFlags, postFlag } = require('../controllers/flagsControllers');
const { handle405s } = require('../errors');

flagsRouter
  .route('/')
  .get(getAllFlags)
  .post(postFlag)
  .all(handle405s);

module.exports = flagsRouter;
