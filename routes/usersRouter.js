const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  postUser
} = require('../controllers/usersControllers');
const { handle405s } = require('../errors');

usersRouter
  .route('/')
  .get(getAllUsers)
  .post(postUser)
  .all(handle405s);

usersRouter.route('/:user_id').get(getUserById);

module.exports = usersRouter;
