import logo from "./logo.svg";
import icon from "./img/mencon.png";
import "./App.css";
import React, { useState, useEffect } from "react";
import Map from "./component/Map";
import { handleSearch } from "./utils";
import { cityCoordinates, useMapSearch } from "./constants.js";
import useGoogleAutocomplete from "./component/useGoogleAutocomplete.js";

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

  useGoogleAutocomplete("pickup-address", setPickupAddress);
  useGoogleAutocomplete("destination", setDestination);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSignOut = () => {
    // handle sign-out logic here
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.matches(".user_icon")) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="root">
      <div className="app_header">
        <div>123</div>
        <img
          className="user_icon"
          src={icon}
          alt="User Icon"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className="dropdown-menu">
            <a href="#">Sign in</a>
            <a href="#">Orders</a>
            <a href="#" onClick={handleSignOut}>
              Sign out
            </a>
          </div>
        )}
      </div>

      <div className="content">
        <div className="form_wrapper">
          <form className="form">
            <select value={selectedCity} onChange={handleCityChange}>
              <option value="San Francisco">San Francisco</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="New York">New York</option>
            </select>
            <br />

            <label htmlFor="pickup-address">Pick-up Address:</label>
            <input type="text" id="pickup-address" value={pickupAddress} />
            <br />

            <label htmlFor="destination">Destination:</label>
            <input type="text" id="destination" value={destination} />
            <br />
            <label htmlFor="weight">Weight:</label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={handleWeightChange}
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
        </div>
        <div className="map_wrapper">
          <Map
            center={cityCoordinates[selectedCity]}
            zoom={10}
            directions={directions}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
