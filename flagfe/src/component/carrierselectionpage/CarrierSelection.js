// For data loading of json -- TEST PURPOSE

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteInfo from "./RouteInfo";
import Map from "../Map";
import { cityCoordinates, useMapSearch } from "../../constants.js";
import getGroundDirection from "./GroundRoute";

const CarrierSelection = () => {
  const { state } = useLocation();
  //console.log(state);

  // get origin and destination, and calculate routes
  const origin = state.data.groundPlan.origin;
  const destionation = state.data.groundPlan.destionation;
  const groundRoute = getGroundDirection(origin, destionation);
  const uavRoute = getGroundDirection(origin, destionation);
  //console.log(groundRoute);
  const directions = [groundRoute, uavRoute];
  //console.log(directions);

  const [center, setCenter] = useState(cityCoordinates["San Francisco"]);

  const navigate = useNavigate();
  //check for local flag
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="content">
      <div className="route-info-wrapper">
        <RouteInfo data={state && state.data} directions={directions} />
      </div>
      <div className="map_wrapper">
        <Map center={center} />
      </div>
    </div>
  );
};

export default CarrierSelection;
