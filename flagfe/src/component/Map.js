import React, { useEffect, useRef } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  // width: "50%",
  width: "1600px",
  height: "1000px",
  // marginLeft: "45%",
  // marginRight: "5%",
};

function Map({ directions, center }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(center);
    }
  }, [center]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default Map;
