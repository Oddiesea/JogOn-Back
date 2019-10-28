const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const flagsRouter = require('./flagsRouter');
const flagTypesRouter = require('./flagTypesRouter');
const routesRouter = require('./routesRouter');

apiRouter.use('/users', usersRouter);
apiRouter.use('/flags', flagsRouter);
apiRouter.use('/flag_types', flagTypesRouter);
apiRouter.use('/routes', routesRouter);

module.exports = apiRouter;
