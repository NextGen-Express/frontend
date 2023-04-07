import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./History.css";
import OrderTable from "./OrderTable";

function History() {
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

  const handleBackClick = () => {
    navigate("/");
  };
  const formattedOrders = orders.map((order) => ({
    carrierId: order.carrierId,
    dest: order.deliveryAddr,
    deliveryTime: order.estimatedDeliveryTime,
    pickupTime: order.estimatedPickTime,
    orderId: order.orderId,
    orderTime: order.orderTime,
    pickup: order.pickupAddr,
    price: order.price,
    status: order.status,
  }));

  const totalCost = formattedOrders
    .reduce((acc, order) => {
      return acc + order.price;
    }, 0)
    .toFixed(2);

  return (
    <div className="root">
      <div
        className="container"
        style={{ maxHeight: "500px", overflowY: "scroll" }}
      >
        <h1>Order Information</h1>
        <OrderTable data={formattedOrders} />
      </div>

      <div className="final-price">
        <h1 className="price">Final Price:</h1>
        <p id="final-price">${totalCost}</p>
        <button id="back-btn" onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default History;
