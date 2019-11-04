const polyline = require('@mapbox/polyline');

exports.minMaxLatLong = region => {
  const { latitude, latitudeDelta, longitude, longitudeDelta } = region;
  if (latitude && latitudeDelta && longitude && longitudeDelta) {
    //PADDING SHOULD BE FLAG RADIUS
    const padding = 0.00003;

    region.min_lat = +(+latitude - +latitudeDelta - padding).toFixed(5);
    region.max_lat = +(+latitude + +latitudeDelta + padding).toFixed(5);
    region.min_long = +(+longitude - +longitudeDelta - padding).toFixed(5);
    region.max_long = +(+longitude + +longitudeDelta + padding).toFixed(5);
    delete region.latitude;
    delete region.longitude;
    delete region.latitudeDelta;
    delete region.longitudeDelta;
  }
  return region;
};

exports.routeAreaFinder = route => {
  let points;
  if (route.poly) {
    points = polyline.decode(route.poly);
  }
  //PADDING SHOULD BE FLAG RADIUS
  const padding = 0.00003;
  if (points && points.length > 1) {
    const lats = [];
    const longs = [];
    points.forEach(coord => {
      lats.push(coord[0]);
      longs.push(coord[1]);
    });
    route.start_location = `POINT(${points[0][0]} ${points[0][1]})`;
    route.min_lat = Math.min(...lats) - padding;
    route.max_lat = Math.max(...lats) + padding;
    route.min_long = Math.min(...longs) - padding;
    route.max_long = Math.max(...longs) + padding;
  }
  return route;
};

exports.routeFlagger = (flag, route) => {
  // THIS VARIABLE DETERMINES THE FLAG RADIUS

  const flagRadius = 3;
  const points = polyline.decode(route.poly);
  const { latitude, longitude } = flag;
  if (
    points.find(point => {
      return (
        latLongToMeters(point[0], point[1], latitude, longitude) <= flagRadius
      );
    })
  )
    return true;
  return false;
};

latLongToMeters = (lat1, lon1, lat2, lon2) => {
  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
};
