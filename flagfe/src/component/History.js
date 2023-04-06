import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./History.css";

function History({ path }) {
  const [finalPrice, setFinalPrice] = useState("$100.00");
  const navigate = useNavigate();
  const { state } = useLocation();
  const orders = state && state.data ? state.data : [];
  console.log(orders);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, []);

  // data.map((order) => setFinalPrice(order["price"]));

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="root">
      <div
        className="container"
        style={{ maxHeight: "500px", overflowY: "scroll" }}
      >
        <h1>Order Information</h1>
        <div>
          {orders.map((order) => (
            <p key={order.orderId}>
              Order ID: {order.orderId}, Status: {order.status}, Pickup Address:{" "}
              {order.pickupAddr}, Delivery Address: {order.deliveryAddr},
              Estimated Pickup Time: {order.estimatedPickTime}, Estimated
              Delivery Time: {order.estimatedDeliveryTime}, Price: {order.price}
            </p>
          ))}
        </div>
      </div>

      <div className="final-price">
        <h1 className="price">Final Price:</h1>
        <p id="final-price">{finalPrice}</p>
        <button id="back-btn" onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default History;
