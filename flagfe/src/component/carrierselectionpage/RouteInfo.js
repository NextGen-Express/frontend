import React, { useState } from "react";
import "./RouteInfo.css";
import Map from "./../Map";
import icon from "../../img/mencon.png";
import { useNavigate, useLocation} from "react-router-dom";

const RouteInfo = ({ directions }) => {
  // const location = useLocation();
  // const data = location.state?.data;
  // console.log(data);


  const [carrierType, setCarrierType] = useState("Robot Car");

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCarrierTypeChange = (e) => {
    setCarrierType(e.target.value);
  };

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Extract route information from the directions object if available
  const routeInfo = directions && directions.routes[0] && directions.routes[0].legs[0];

  return (
    <div className="root">
      <div className="app_header">
        <div className="app_header_left">-NextGen Express-</div>
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
            <div className="order-info-block">
              <div className="route-info-section">
                <h3>Route Information</h3>
                {routeInfo && (
                  <>
                    <p>
                      Distance: {routeInfo.distance.text} ({routeInfo.distance.value}{" "}
                      meters)
                    </p>
                    <p>
                      Duration: {routeInfo.duration.text} ({routeInfo.duration.value}{" "}
                      seconds)
                    </p>
                  </>
                )}
                <div className="info-blocks">
                  <div className="info-block">
                    <h4>Estimated_Pickup_Time:</h4>
                    <div className="number-display">
                      <span>00:00</span>
                    </div>
                  </div>
                  <div className="info-block">
                    <h4>Estimated_Delivery_Time:</h4>
                    <div className="number-display">
                      <span>00:00</span>
                    </div>
                  </div>
                  <div className="info-block">
                    <h4>Price:</h4>
                    <div className="number-display">
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
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
                <button className="book-button">Book</button>
              </div>
            </div>
          </form>
        </div>
        <div className="map_wrapper">
          <Map center={{ lat: 37.7749, lng: -122.4194 }} zoom={10} />
        </div>
      </div>
    </div>
  );
};



export default RouteInfo;