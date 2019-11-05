const usersRouter = require('express').Router();
const { postUser } = require('../controllers/usersControllers');
const { handle405s } = require('../errors');

usersRouter
  .route('/')
  .post(postUser)
  .all(handle405s);

module.exports = usersRouter;
