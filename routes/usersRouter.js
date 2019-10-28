const usersRouter = require('express').Router();
const { getAllUsers } = require('../controllers/usersControllers');

usersRouter.route('/').get(getAllUsers);

module.exports = usersRouter;
