const { expect } = require('chai');
const {
  minMaxLatLong,
  routeAreaFinder,
  routeFlagger
} = require('../utils/utils');

describe('minMaxLatLong', () => {
  it('returns nothing when not passed all necessary fields', () => {
    expect(minMaxLatLong()).to.equal(undefined);
    expect(minMaxLatLong(undefined, 1, 1, 1)).to.equal(undefined);
    expect(minMaxLatLong(1, 1, 1, undefined)).to.equal(undefined);
    expect(minMaxLatLong(1, 1, undefined, 1)).to.equal(undefined);
  });
  it('returns an object with minLat, maxLat, minLong and maxLong values', () => {
    expect(minMaxLatLong(50, 1, 40, 4)).to.eql({
      min_lat: 49,
      max_lat: 51,
      min_long: 36,
      max_long: 44
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
