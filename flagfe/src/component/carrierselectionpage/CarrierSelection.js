import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RouteInfo from "./RouteInfo";
import Map from "../Map";
import { cityCoordinates, useMapSearch } from "../../constants.js";

const CarrierSelection = () => {
  const location = useLocation();
  const directions = location.state && location.state.directions;
  const [center, setCenter] = useState(cityCoordinates["San Francisco"]);

  useEffect(() => {
    if (directions) {
      const startLatLng = new window.google.maps.LatLng(
        directions.routes[0].legs[0].start_location.lat(),
        directions.routes[0].legs[0].start_location.lng()
      );
      setCenter(startLatLng);
    }
  }, [directions]);

  return (
    <div className="content">
      <div className="route-info-wrapper">
        <RouteInfo directions={directions} />
      </div>
      <div className="map_wrapper">
        <Map center={center} />
      </div>
    </div>
  );
};

export default CarrierSelection;
