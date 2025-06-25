"use client";

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userSignup" element={<UserSignup />} />
          <Route path="/captainLogin" element={<CaptainLogin />} />
          <Route path="/captainSignup" element={<CaptainSignup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
