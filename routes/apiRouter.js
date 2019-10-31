const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const flagsRouter = require('./flagsRouter');
const flagTypesRouter = require('./flagTypesRouter');
const routesRouter = require('./routesRouter');
const junctionsRouter = require('./junctionsRouter');

apiRouter.use('/users', usersRouter);
apiRouter.use('/flags', flagsRouter);
apiRouter.use('/flag_types', flagTypesRouter);
apiRouter.use('/routes', routesRouter);
apiRouter.use('/junctions', junctionsRouter);

module.exports = apiRouter;
