import React from "react";
import { useLocation } from "react-router-dom";
import RouteInfo from "./RouteInfo";
import Map from "../Map";
import { cityCoordinates, useMapSearch } from "../../constants.js";


const CarrierSelection = () => {
  const location = useLocation();
  const directions = location.state.directions;

  return (
    <div className="content">
      <div className="route-info-wrapper">
        <RouteInfo directions={directions} />
      </div>
      <div className="map_wrapper">
        <Map center={cityCoordinates["San Francisco"]} zoom={10} directions={directions} />
      </div>
    </div>
  );
};

export default CarrierSelection;
