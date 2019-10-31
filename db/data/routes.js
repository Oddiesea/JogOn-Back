const polyline = require('@mapbox/polyline');
const testPoly = polyline.encode([[15.0, 1.5], [22.2, 2.2], [335.123456, 3.3]]);

module.exports = [
  {
    poly: 'fdyugehwfdbweuy7fuijwehi67892389yuhjeidbgycghwby',
    length_in_km: 5.45,
    user_id: 1,
    min_lat: 1.1,
    max_lat: 2.2,
    min_long: 1.1,
    max_long: 2.2
  },
  {
    poly: 'ytfgjiuiu8y8u8787879898989dhywhcvyhxk',
    length_in_km: 6.45,
    user_id: 2,
    min_lat: 1.1,
    max_lat: 2.2,
    min_long: 1.1,
    max_long: 2.2
  },
  {
    poly: 'duhewjfhiuyeuowhf7t43iyr7474386582390rhckjchqiuef',
    length_in_km: 10.5,
    user_id: 3,
    min_lat: 1.1,
    max_lat: 2.2,
    min_long: 1.1,
    max_long: 2.2
  },
  {
    poly: testPoly,
    length_in_km: 6.4,
    user_id: 4,
    min_lat: 10.1,
    max_lat: 20.2,
    min_long: 1.1,
    max_long: 2.2
  }
];
