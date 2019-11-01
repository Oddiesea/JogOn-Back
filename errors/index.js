exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

// PSQL ERRORS
exports.handleTooLarge = (err, req, res, next) => {
  if (err.code === '22003') {
    res.status(400).send({ msg: 'Item ID too large.' });
  } else next(err);
};

exports.handlePsql400s = (err, req, res, next) => {
  const codes = ['23502', '22P02', '42703'];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request.' });
  } else next(err);
};

exports.handlePsql422s = (err, req, res, next) => {
  const codes = ['23503'];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: 'Unprocessable entity.' });
  } else next(err);
};

// CUSTOM ERRORS
exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: 'Page not found.' });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: 'Invalid method.' });
};

// SERVER ERRORS
exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server error.');
};
