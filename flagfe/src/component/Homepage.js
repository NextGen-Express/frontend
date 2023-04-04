import icon from "../img/mencon.png";
import "./Homepage.css";
import React, { useState, useEffect } from "react";
import Map from "./Map";
import { handleSearch } from "../utils";
import { cityCoordinates, useMapSearch } from "../../src/constants.js";
import useGoogleAutocomplete from "./useGoogleAutocomplete.js";
import { useNavigate } from "react-router-dom";

function Homepage() {
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

  const [weight, setWeight] = useState("");

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
  const navigate = useNavigate();

  const onSearchClick = () => {
    handleSearch(pickupAddress, destination, setDirections);
    navigate("/carrier-selection", { state: { directions } });
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
        <div className="app_header_left">-LaiEx-</div>
        <img
          className="user_icon"
          src={icon}
          alt="User Icon"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className="dropdown-menu">
            <a onClick={() => navigate("/History")}>Orders</a>
            <a onClick={() => navigate("/Login")}>Signout</a>
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

            <button type="button" onClick={onSearchClick}>
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

export default Homepage;
