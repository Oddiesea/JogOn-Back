const connection = require('../connection');

exports.fetchAllFlags = ({ min_lat, max_lat, min_long, max_long }) => {
  return connection('flags')
    .select('*')
    .modify(query => {
      if (min_lat && max_lat && min_long && max_long) {
        query
          .where('latitude', '<=', max_lat)
          .andWhere('latitude', '>=', min_lat)
          .andWhere('longitude', '<=', max_long)
          .andWhere('longitude', '>=', min_long);
      }
    })
    .then(flags => {
      return flags;
    });
};

exports.addFlag = flagObj => {
  return connection('flags')
    .insert(flagObj, '*')
    .then(([flag]) => {
      return flag;
    });
};
