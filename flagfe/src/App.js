import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Map from "./component/Map";
import { handleSearch } from "./utils";
import { cityCoordinates, useMapSearch } from "./constants.js";

function App() {
  const {
    pickupAddress,
    setPickupAddress,
    destination,
    setDestination,
    directions,
    setDirections,
    selectedCity,
    setSelectedCity,
  } = useMapSearch();

  const handlePickupAddressChange = (e) => {
    setPickupAddress(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <h1>LaiEx</h1>
      <form>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="New York">New York</option>
        </select>
        <br />
        <label htmlFor="pickup-address">Pick-up Address:</label>
        <input
          type="text"
          id="pickup-address"
          value={pickupAddress}
          onChange={handlePickupAddressChange}
        />
        <br />
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={handleDestinationChange}
        />
        <br />

        <button
          type="button"
          onClick={() =>
            handleSearch(pickupAddress, destination, setDirections)
          }
        >
          Search
        </button>
      </form>
      <Map
        center={cityCoordinates[selectedCity]}
        zoom={10}
        directions={directions}
      />
    </div>
  );
}

export default App;
