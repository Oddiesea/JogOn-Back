const userRouter = require('express').Router();
const {fetchAllUsers} = require("../controllers/userController")

userRouter.route('/').get(fetchAllUsers)

module.exports = userRouter;