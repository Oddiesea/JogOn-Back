const { connection } = require('../connection');

exports.fetchAllFlagTypes = () => {
  return connection('flag_types')
    .select('*')
    .then(flagTypes => {
      return flagTypes;
    });
};
