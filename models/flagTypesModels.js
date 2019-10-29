const connection = require('../connection');

exports.fetchAllFlagTypes = () => {
  return connection('flag_types')
    .select('*')
    .then(flagTypes => {
      return flagTypes;
    });
};

exports.addFlagType = flagTypeObj => {
  return connection('flag_types')
    .insert(flagTypeObj, '*')
    .then(([flagType]) => {
      return flagType;
    });
};
