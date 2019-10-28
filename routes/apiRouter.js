const apiRouter = require('express').Router();
const userRouter= require('./userRouter')

apiRouter.use('/', userRouter)

module.exports = apiRouter;