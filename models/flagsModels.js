const connection = require('../connection');

exports.fetchAllFlags = ({
  min_lat,
  max_lat,
  min_long,
  max_long,
  user_id,
  flag_type_id
}) => {
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
      if (user_id) {
        query.where({ user_id });
      }
      if (flag_type_id) {
        query.where({ flag_type_id });
      }
    })
    .then(flags => {
      return flags;
    });
};

exports.addFlags = flags => {
  return connection('flags')
    .insert(flags, '*')
    .then(flags => {
      return flags;
    });
};

exports.fetchFlag = flag_id => {
  return connection('flags')
    .select('*')
    .where({ flag_id })
    .then(([flag]) => {
      if (flag) return flag;
      else throw { status: 404, msg: 'Item not found.' };
    });
};

exports.removeFlag = flag_id => {
  return connection('flags')
    .delete()
    .where({ flag_id });
};
