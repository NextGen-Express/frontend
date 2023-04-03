import React, { useState } from "react";
import "./RouteInfo.css"; // Don't forget to import the CSS file

const RouteInfo = ({ directions, onBookButtonClick }) => {
  const [carrierType, setCarrierType] = useState("Robot Car");

  const handleCarrierTypeChange = (e) => {
    setCarrierType(e.target.value);
  };

  // Extract route information from the directions object if available
  var routeInfo = directions && directions.routes[0] && directions.routes[0].legs[0];

  return (
    <div className="route-info">
      <div className="route-info-header">
        {/* Add your user icon here */}
      </div>
      <div className="order-info-block">
        <div className="route-info-section">
          <h3>Route Information</h3>
          {routeInfo ? (
            <>
              <p>
                Distance: {routeInfo.distance.text} ({routeInfo.distance.value} meters)
              </p>
              <p>
                Duration: {routeInfo.duration.text} ({routeInfo.duration.value} seconds)
              </p>
            </>
          ) : (
            <p>No route information available</p>
          )}
        </div>
        <div className="carrier-type-section">
          <h3>Select Carrier</h3>
          <select
            className="carrier-type-dropdown"
            value={carrierType}
            onChange={handleCarrierTypeChange}
          >
            <option value="Robot Car">Robot Car</option>
            <option value="UAV">UAV</option>
          </select>
        </div>
        <div className="book-section">
          <button className="book-button" onClick={onBookButtonClick}>
            Book
          </button>
        </div>
      </div>
      <div className="map_wrapper">
        {/* Add the Map component here */}
      </div>
    </div>
  );
};

export default RouteInfo;
