import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import icon from "./img/mencon.png";
import Map from "./component/Map";
import { handleSearch } from "./utils";
import { cityCoordinates, useMapSearch } from "./constants.js";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./component/Homepage";
import Login from "./component/Login";
import Signup from "./component/Signup";
import History from "./component/History";
import CarrierSelection from "./component/carrierselectionpage/CarrierSelection";
import Logout from "./component/Logout";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Logout" element={<Logout />} />
          <Route
            exact
            path="/History"
            element={<History path="http://localhost:8080/home/history" />}
          />
          <Route
            exact
            path="/carrier-selection"
            element={<CarrierSelection />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
