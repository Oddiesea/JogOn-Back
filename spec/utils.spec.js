const { expect } = require('chai');
const {
  minMaxLatLong,
  routeAreaFinder,
  routeFlagger
} = require('../utils/utils');

describe('minMaxLatLong', () => {
  it('returns nothing when not passed all necessary fields', () => {
    expect(
      minMaxLatLong({ latitude: 1.1, longitude: 2.2, longitudeDelta: 2.2 })
    ).to.equal(undefined);
  });
  it('returns an object with minLat, maxLat, minLong and maxLong values', () => {
    expect(
      minMaxLatLong({
        latitude: 1.1,
        longitude: 2.2,
        latitudeDelta: 1.1,
        longitudeDelta: 2.2
      })
    ).to.eql({
      min_lat: 0,
      max_lat: 2.2,
      min_long: 0,
      max_long: 4.4
    });
  });
});

describe('routeAreaFinder', () => {
  it('returns undefined unless at least two points are passed', () => {
    expect(routeAreaFinder({ points: [[1, 2]] })).to.equal(undefined);
  });
  it('returns an object with minLat, maxLat, minLong and maxLong values', () => {
    expect(routeAreaFinder({ points: [[1, 1], [2, 2], [3, 1]] })).to.eql({
      min_lat: 1,
      max_lat: 3,
      min_long: 1,
      max_long: 2
    });
  });
});
describe('routeFlagger', () => {
  it('returns an empty array when passed no close-by flags', () => {
    expect(
      routeFlagger(
        { flag_id: 1, latitude: 1, longitude: 1 },
        { points: [20, 20] }
      )
    ).to.equal(false);
  });
  it('returns an array of route points that are close to a set of flags', () => {
    expect(
      routeFlagger(
        { flag_id: 1, latitude: 1, longitude: 1.5 },
        { route_id: 1, points: [[1, 1], [1, 2], [1, 3], [1, 4]] }
      )
    ).to.equal(true);
  });
});
