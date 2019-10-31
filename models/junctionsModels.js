const connection = require('../connection');

exports.fetchAllJunctions = () => {
  return connection('junctions')
    .select('*')
    .then(junctions => {
      return junctions;
    });
};

exports.addJunctions = junctions => {
  return connection('junctions').insert(junctions);
};
