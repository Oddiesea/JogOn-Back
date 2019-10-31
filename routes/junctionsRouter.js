const junctionsRouter = require('express').Router();
const {
  getAllJunctions,
  postJunctions
} = require('../controllers/junctionsControllers');
const { handle405s } = require('../errors');

junctionsRouter
  .route('/')
  .get(getAllJunctions)
  .post(postJunctions)
  .all(handle405s);

module.exports = junctionsRouter;
