'use strict';

const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const {
  handleCustomErrors,
  handlePsql400s,
  handlePsql422s,
  handle404s,
  handle500s
} = require('./errors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use('/*', handle404s);

//ERROR HANDLERS
app.use(handleCustomErrors);
app.use(handlePsql400s);
app.use(handlePsql422s);
app.use(handle500s);

module.exports = app;
