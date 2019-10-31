const junctionsRouter = require('express').Router();
const {
  getAllJunctions,
  postJunctions
} = require('../controllers/junctionsControllers');

junctionsRouter
  .route('/')
  .get(getAllJunctions)
  .post(postJunctions);

module.exports = junctionsRouter;
