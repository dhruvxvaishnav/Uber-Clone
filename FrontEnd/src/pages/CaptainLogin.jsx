import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const CaptainLogin = () => {
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainPassword, setCaptainPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      captainEmail: captainEmail,
      password: captainPassword,
    });
    setCaptainEmail("");
    setCaptainPassword("");
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url(/Traffic_Light.png)" }}>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <img className="w-24 mb-10" src="/Uber_logo_2018.png" alt="Uber Logo" />
          <h1 className="text-3xl font-bold mb-6">Captain Login</h1>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
            <input
              className="bg-[#eeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg placeholder:text-base "
              type="email"
              required
              value={captainEmail}
              onChange={(e) => setCaptainEmail(e.target.value)}
              placeholder="Enter Your Email Here"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg placeholder:text-base "
              type="password"
              required
              value={captainPassword}
              onChange={(e) => setCaptainPassword(e.target.value)}
              placeholder="Enter Your Password Here"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
              Login
            </button>
          </form>
          <p className="text-center ">
            Join The Fleet?{" "}
            <Link to="/captainSignup" className="text-blue-600 ">
              Register As a Captain
            </Link>
          </p>
          <div className="my-4 text-center">
            <p className="text-gray-500">or</p>
          </div>
          <Link
            to="/userLogin"
            className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base "
          >
            Sign In as User
          </Link>
        </div>
      </div>
    </div>
  );
};
