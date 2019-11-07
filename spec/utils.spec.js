const { expect } = require('chai');
const {
  minMaxLatLong,
  routeAreaFinder,
  routeFlagger
} = require('../utils/utils');
const polyline = require('@mapbox/polyline');
describe('minMaxLatLong', () => {
  it('returns original value when not passed all necessary fields', () => {
    expect(
      minMaxLatLong({ latitude: 1.1, longitude: 2.2, longitudeDelta: 2.2 })
    ).to.eql({ latitude: 1.1, longitude: 2.2, longitudeDelta: 2.2 });
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
      min_lat: -0.00003,
      max_lat: 2.20003,
      min_long: -0.00003,
      max_long: 4.40003
    });
  });
});

describe('routeAreaFinder', () => {
  it('returns original value unless at least two points are passed', () => {
    expect(routeAreaFinder({ points: [[1, 2]] })).to.eql({ points: [[1, 2]] });
  });
  it('returns an object with minLat, maxLat, minLong and maxLong values', () => {
    expect(
      routeAreaFinder({ poly: polyline.encode([[1, 1], [2, 2], [3, 1]]) })
    ).to.eql({
      poly: '_ibE_ibE_ibE_ibE_ibE~hbE',
      min_lat: 0.99997,
      max_lat: 3.00003,
      min_long: 0.99997,
      max_long: 2.00003,
      start_location: 'POINT(1 1)'
    });
  });
});
describe('routeFlagger', () => {
  it('returns an empty array when passed no close-by flags', () => {
    expect(
      routeFlagger(
        { flag_id: 1, latitude: 1, longitude: 1 },
        { poly: polyline.encode([[20, 20]]) }
      )
    ).to.equal(false);
  });
  it('returns an array of route points that are close to a set of flags', () => {
    expect(
      routeFlagger(
        { flag_id: 1, latitude: 1, longitude: 1.00002 },
        { route_id: 1, poly: polyline.encode([[1, 1], [1, 2], [1, 3], [1, 4]]) }
      )
    ).to.equal(true);
  });
});
