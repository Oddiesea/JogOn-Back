exports.minMaxLatLong = (
  latitude,
  latitudeDelta,
  longitude,
  longitudeDelta
) => {
  if (latitude && latitudeDelta && longitude && longitudeDelta) {
    //PADDING SHOULD BE FLAG RADIUS
    const padding = 0;
    return {
      minLat: latitude - latitudeDelta - padding,
      maxLat: latitude + latitudeDelta + padding,
      minLong: longitude - longitudeDelta - padding,
      maxLong: longitude + longitudeDelta + padding
    };
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
      minLat: Math.min(...lats) - padding,
      maxLat: Math.max(...lats) + padding,
      minLong: Math.min(...longs) - padding,
      maxLong: Math.max(...longs) + padding
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
