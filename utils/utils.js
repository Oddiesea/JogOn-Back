const polyline = require('@mapbox/polyline');

exports.minMaxLatLong = region => {
  const { latitude, latitudeDelta, longitude, longitudeDelta } = region;
  if (latitude && latitudeDelta && longitude && longitudeDelta) {
    //PADDING SHOULD BE FLAG RADIUS
    const padding = 0.00003;

    region.min_lat = +latitude - +latitudeDelta - padding;
    region.max_lat = +latitude + +latitudeDelta + padding;
    region.min_long = +longitude - +longitudeDelta - padding;
    region.max_long = +longitude + +longitudeDelta + padding;
    delete region.latitude;
    delete region.longitude;
    delete region.latitudeDelta;
    delete region.longitudeDelta;
  }
  return region;
};

//////////////////////////////////////////////////////////////////////////

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

    route.min_lat = Math.min(...lats) - padding;
    route.max_lat = Math.max(...lats) + padding;
    route.min_long = Math.min(...longs) - padding;
    route.max_long = Math.max(...longs) + padding;
  }
  return route;
};

///////////////////////////////////////////////////////////////////////////

exports.routeFlagger = (flag, route) => {
  // THIS VARIABLE DETERMINES THE FLAG RADIUS

  const flagRadius = 0.00003;
  const points = polyline.decode(route.poly);
  const { latitude, longitude } = flag;
  if (
    points.find(point => {
      const x = latitude - point[0];
      const y = longitude - point[1];
      const hypot = Math.sqrt(x ** 2 + y ** 2);
      return hypot <= flagRadius;
    })
  )
    return true;
  return false;
};
