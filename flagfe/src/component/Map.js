import React, { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "1600px",
  height: "1000px",
};

const markerLocations = [
  {
    id: 1,
    position: { lat: 37.73874747540093, lng: -122.4683741639298 },
    address: "236 W Portal Ave, San Francisco, CA 94127",
  },
  {
    id: 2,
    position: { lat: 37.787047187280024, lng: -122.45343392870515 },
    address: "3145 Geary Blvd, San Francisco, CA 94118",
  },
  {
    id: 3,
    position: { lat: 37.75872860740814, lng: -122.41489106937792 },
    address: "1198 S Van Ness Ave, San Francisco, CA 94110",
  },
];

function Map({ center, route }) {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  const createMarker = (location) => {
    const marker = new window.google.maps.Marker({
      position: location.position,
      map: mapInstance,
      title: location.address,
    });

    marker.addListener("click", () => {
      if (infoWindow) {
        infoWindow.close();
      }
      const newInfoWindow = new window.google.maps.InfoWindow({
        content: `<div>${location.address}</div>`,
      });
      newInfoWindow.open(mapInstance, marker);
      setInfoWindow(newInfoWindow);
    });
  };

  useEffect(() => {
    if (!mapInstance) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
      });

      setMapInstance(map);
      map.addListener("click", (event) => {
        if (infoWindow) {
          infoWindow.close();
        }
        const newInfoWindow = new window.google.maps.InfoWindow({
          content: `<div>Latitude: ${event.latLng.lat()}<br>Longitude: ${event.latLng.lng()}</div>`,
          position: event.latLng,
        });
        newInfoWindow.open(map);
        setInfoWindow(newInfoWindow);
      });

      if (!directionsRenderer) {
        const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
        newDirectionsRenderer.setMap(map);
        setDirectionsRenderer(newDirectionsRenderer);
      }
    } else {
      mapInstance.panTo(center);
      markerLocations.forEach(createMarker);
    }
  }, [center, mapInstance]);

  useEffect(() => {
    if (directionsRenderer && route) {
      directionsRenderer.setDirections(route);
    }
  }, [directionsRenderer, route]);

  return <div ref={mapRef} style={containerStyle}></div>;
}

export default Map;
