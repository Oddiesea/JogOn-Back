exports.handlePsql400s = (err, req, res, next) => {
  const codes = ["23502"];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request." });
  } else next(err);
};
exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method." });
};
