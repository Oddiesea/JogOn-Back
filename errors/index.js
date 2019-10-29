// PSQL ERRORS
exports.handlePsql400s = (err, req, res, next) => {
  const codes = ['23502', '22P02'];
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

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server error.');
};
