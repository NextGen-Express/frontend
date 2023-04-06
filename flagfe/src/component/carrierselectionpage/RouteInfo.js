import React, { useState, useEffect } from "react";
import "./RouteInfo.css";
import Map from "./../Map";
import icon from "../../img/mencon.png";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "../Logout";

const RouteInfo = ({ directions, data }) => {
  const [carrierType, setCarrierType] = useState("Robot Car");

  const [estimatedPickupTime, setEstimatedPickupTime] = useState("00:00");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("00:00");
  const [price, setPrice] = useState("0.00");

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCarrierTypeChange = (e) => {
    setCarrierType(e.target.value);
  };

  useEffect(() => {
    if (!data) return;
    if (carrierType === "Robot Car" && data.groundPlan) {
      const pickTime = new Date(data.groundPlan.estimatedPickTime);
      const deliveryTime = new Date(data.groundPlan.estimatedDeliveryTime);
      setEstimatedPickupTime(`${pickTime.getHours()}:${pickTime.getMinutes()}`);
      setEstimatedDeliveryTime(
        `${deliveryTime.getHours()}:${deliveryTime.getMinutes()}`
      );
      setPrice(data.groundPlan.price.toFixed(2));
    } else if (carrierType === "UAV" && data.uavPlan) {
      const pickTime = new Date(data.uavPlan.estimatedPickTime);
      const deliveryTime = new Date(data.uavPlan.estimatedDeliveryTime);
      setEstimatedPickupTime(`${pickTime.getHours()}:${pickTime.getMinutes()}`);
      setEstimatedDeliveryTime(
        `${deliveryTime.getHours()}:${deliveryTime.getMinutes()}`
      );
      setPrice(data.uavPlan.price.toFixed(2));
    }
  }, [carrierType, data]);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSignOut = async () => {
    try {
      await Logout();
      console.log("Sign out successful");
      localStorage.setItem("isLoggedIn", false);
      navigate("/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Extract route information from the directions object if available
  const routeInfo =
    directions && directions.routes[0] && directions.routes[0].legs[0];

  // New function to handle the "Book" button click
  const onBookClick = async (e) => {
    e.preventDefault();
    const selectedPlan =
      carrierType === "Robot Car" ? data.groundPlan : data.uavPlan;
    // const routeInfo = selectedPlan.route.legs[0];
    const payload = {
      estimated_pick_time: selectedPlan.estimatedPickTime,
      estimated_delivery_time: selectedPlan.estimatedDeliveryTime,
      pickup_addr:
        carrierType === "Robot Car"
          ? selectedPlan.route.legs[0].startAddress
          : selectedPlan.origin,
      delivery_addr:
        carrierType === "Robot Car"
          ? selectedPlan.route.legs[0].endAddress
          : selectedPlan.destionation,
      carrier_id: selectedPlan.carrierId,
      price: selectedPlan.price.toFixed(2),
    };

    try {
      const response = await fetch("/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        // Handle successful booking (navigate to stripe is also here?)
        console.log("Booking successful");
        const responseData = await response.json();
        const url = responseData.url;
        window.location.href = url;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <a onClick={handleSignOut}>Signout</a>
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
                      Distance: {routeInfo.distance.text} (
                      {routeInfo.distance.value} meters)
                    </p>
                    <p>
                      Duration: {routeInfo.duration.text} (
                      {routeInfo.duration.value} seconds)
                    </p>
                  </>
                )}
                <div className="info-blocks">
                  <div className="info-block">
                    <h4>Estimated_Pickup_Time:</h4>
                    <div className="number-display">
                      <span>{estimatedPickupTime}</span>
                    </div>
                  </div>
                  <div className="info-block">
                    <h4>Estimated_Delivery_Time:</h4>
                    <div className="number-display">
                      <span>{estimatedDeliveryTime}</span>
                    </div>
                  </div>
                  <div className="info-block">
                    <h4>Price:</h4>
                    <div className="number-display">
                      <span>${price}</span>
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
                {/* Updated the onClick event */}
                <button className="book-button" onClick={(e) => onBookClick(e)}>
                  Book
                </button>
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
