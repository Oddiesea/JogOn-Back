const flagsRouter = require('express').Router();
const { getAllFlags, postFlag } = require('../controllers/flagsControllers');

flagsRouter
  .route('/')
  .get(getAllFlags)
  .post(postFlag);

module.exports = flagsRouter;
