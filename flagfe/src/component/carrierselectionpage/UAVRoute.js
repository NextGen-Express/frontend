function getStraightLine(origin, destination) {
  const lineCoordinates = [
    { lat: origin.lat, lng: origin.lng },
    { lat: destination.lat, lng: destination.lng },
  ];

  const line = new window.google.maps.Polyline({
    path: lineCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  return line;
}

export default getStraightLine;
