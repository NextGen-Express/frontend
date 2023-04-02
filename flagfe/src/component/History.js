import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './History.css';

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

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="container" style={{ maxHeight: "500px", overflowY: "scroll" }}>
      <h1>Order Information</h1>
      {data.map((order) => (
        <div key={order.id}>
          {Object.keys(order).map((key) => (
            <p id={key} key={key}>
              {order[key]}
            </p>
          ))}
        </div>
      ))}
      <h1 className="price">Final Price:</h1>
      <p id="final-price">{finalPrice}</p>
      <button id="back-btn" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
}

export default History;
