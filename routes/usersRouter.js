const usersRouter = require("express").Router();
const { getAllUsers, postUser } = require("../controllers/usersControllers");
const { handle405s } = require("../errors");

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(postUser)
  .all(handle405s);

module.exports = usersRouter;
