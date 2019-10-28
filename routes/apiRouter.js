const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const flagsRouter = require('./flagsRouter');

apiRouter.use('/users', usersRouter);
apiRouter.use('/flags', flagsRouter);

module.exports = apiRouter;
