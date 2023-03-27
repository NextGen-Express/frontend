import React from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  // width: "50%",
  width: "1600px",
  height: "1000px",
  // marginLeft: "45%",
  // marginRight: "5%",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

function Map({ directions }) {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default Map;
