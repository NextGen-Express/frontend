// For data loading of json -- TEST PURPOSE

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteInfo from "./RouteInfo";
import Map from "../Map";
import { cityCoordinates, useMapSearch } from "../../constants.js";

const CarrierSelection = () => {
  const { state } = useLocation();
  console.log(state);

  const location = useLocation();
  const directions = location.state && location.state.directions;
  const [center, setCenter] = useState(cityCoordinates["San Francisco"]);

  const navigate = useNavigate();
  //check for local flag
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, []);

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
        <RouteInfo data={state.data} directions={directions} />
      </div>
      <div className="map_wrapper">
        <Map center={center} />
      </div>
    </div>
  );
};

export default CarrierSelection;
