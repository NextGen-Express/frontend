import React, { useEffect, useRef, useState } from "react";
import getStraightLine from "./carrierselectionpage/UAVRoute";

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

function Map({ center, route, carrierType, origin, destination }) {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [line, setLine] = useState(null);

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

  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject(
            new Error(
              "Geocode was not successful for the following reason: " + status
            )
          );
        }
      });
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
        const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
        newDirectionsRenderer.setMap(map);
        setDirectionsRenderer(newDirectionsRenderer);
      }
    } else {
      mapInstance.panTo(center);
      markerLocations.forEach(createMarker);
    }
  }, [center, mapInstance]);

  useEffect(() => {
    const drawLine = async () => {
      if (mapInstance && origin && destination) {
        if (carrierType === "Robot Car") {
          if (directionsRenderer && route) {
            directionsRenderer.setDirections(route);
            
            const startMarker = new window.google.maps.Marker({
              position: route.routes[0].legs[0].start_location,
              map: mapInstance,
              label: "Start",
            });

            const endMarker = new window.google.maps.Marker({
              position: route.routes[0].legs[0].end_location,
              map: mapInstance,
              label: "End",
            });
          }

          if (line) {
            line.setMap(null);
            setLine(null);
          }
        } else {
          if (directionsRenderer) {
            directionsRenderer.setDirections({ routes: [] });
          }

          // if (line) {
          //   line.setMap(null);
          // }

          try {
            const originCoords = await geocodeAddress(origin);
            const destinationCoords = await geocodeAddress(destination);

            const straightLine = new window.google.maps.Polyline({
              path: [originCoords, destinationCoords],
              geodesic: true,
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
            });

            straightLine.setMap(mapInstance);
            setLine(straightLine);

            // Calculate the midpoint of the straight line
            const midPoint = new window.google.maps.LatLng(
              (originCoords.lat() + destinationCoords.lat()) / 2,
              (originCoords.lng() + destinationCoords.lng()) / 2
            );

            // Set the midpoint as the map center
            mapInstance.setCenter(midPoint);
          } catch (error) {
            console.error("Error drawing line:", error);
          }
        }
      }
    };

    drawLine();
  }, [
    mapInstance,
    origin,
    destination,
    carrierType,
    directionsRenderer,
    route,
  ]);
  return <div ref={mapRef} style={containerStyle}></div>;
}

export default Map;