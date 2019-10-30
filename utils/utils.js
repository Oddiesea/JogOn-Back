exports.minMaxLatLong = route => {
  const { latitude, latitudeDelta, longitude, longitudeDelta } = route;
  if (latitude && latitudeDelta && longitude && longitudeDelta) {
    //PADDING SHOULD BE FLAG RADIUS
    const padding = 0;

    route.min_lat = latitude - latitudeDelta - padding;
    route.max_lat = latitude + latitudeDelta + padding;
    route.min_long = longitude - longitudeDelta - padding;
    route.max_long = longitude + longitudeDelta + padding;
    delete route.latitude;
    delete route.longitude;
    delete route.latitudeDelta;
    delete route.longitudeDelta;
    return route;
  }
};

exports.routeAreaFinder = route => {
  const { points } = route;
  //PADDING SHOULD BE FLAG RADIUS
  const padding = 0;
  if (points && points.length > 1) {
    const lats = [];
    const longs = [];
    points.forEach(coord => {
      lats.push(coord[0]);
      longs.push(coord[1]);
    });
    return {
      min_lat: Math.min(...lats) - padding,
      max_lat: Math.max(...lats) + padding,
      min_long: Math.min(...longs) - padding,
      max_long: Math.max(...longs) + padding
    };
  }
};

exports.routeFlagger = (flag, route) => {
  // THIS VARIABLE DETERMINES THE FLAG RADIUS

  const flagRadius = 1;
  const { points } = route;
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
