const express = require("express");
const apiRouter = require("./routes/apiRouter");
const { handlePsql400s } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

//ERROR HANDLERS
app.use(handlePsql400s);
module.exports = app;
