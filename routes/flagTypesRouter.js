const flagTypesRouter = require('express').Router();
const { getAllFlagTypes } = require('../controllers/flagTypesControllers');

flagTypesRouter.route('/').get(getAllFlagTypes);

module.exports = flagTypesRouter;
