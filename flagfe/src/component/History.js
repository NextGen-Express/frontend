import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./History.css";

function History({ path }) {
  const [data, setData] = useState([]);
  const [finalPrice, setFinalPrice] = useState("$100.00");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [path]);

  data.map((order) => setFinalPrice(order["price"]));

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
        {data.map((order) => (
          <div key={order.id}>
            {Object.keys(order)
              .filter((key) => key !== "price")
              .map((key) => (
                <p id={key} key={key}>
                  {order[key]}
                </p>
              ))}
          </div>
        ))}
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
