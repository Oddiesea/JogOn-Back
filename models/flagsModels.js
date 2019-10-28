const { connection } = require('../connection');

exports.fetchAllFlags = () => {
  return connection('flags')
    .select('*')
    .then(flags => {
      return flags;
    });
};
