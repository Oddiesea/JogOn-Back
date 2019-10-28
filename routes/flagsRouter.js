const flagsRouter = require('express').Router();
const { getAllFlags } = require('../controllers/flagsControllers');

flagsRouter.route('/').get(getAllFlags);

module.exports = flagsRouter;
