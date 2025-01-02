import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FaMobileAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function LoginWithPhone({ onNext,onSignup }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const sendOtp = (phone) => {
    axios
      .post(`https://admin.stetthups.com/api/v1/send/otp?phone=${phone}`)
      .then((response) => {
        toast.success("OTP sent successfully!");
        setShowOtpInput(true); 
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to send SMS OTP!");
        console.log(error.response?.data);
      });
  };

  const verifyOtp = () => {
    axios
      .post(`https://admin.stetthups.com/api/v1/verify/otp?phone=${phone}`, {
        otp,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        toast.success("Welcome Back!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "OTP verification failed!"
        );
        console.log(error.response?.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showOtpInput) {
      verifyOtp();
    } else {
      sendOtp(phone);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl px-4 sm:px-8 md:px-12 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#4E46B4] mb-2 sm:mb-4 text-center">
        Login
      </h2>
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
        Sign in to your account
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="flex items-center">
          <span className="w-1/4 sm:w-1/5 text-gray-500 pl-2 sm:pl-4 pr-1 py-2 bg-slate-100 rounded-l-md focus:outline-none flex items-center justify-center text-sm sm:text-base">
            <FaMobileAlt className="mr-1 sm:mr-2" />
            +91
          </span>
          <input
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            name="PhoneNumber"
            value={phone}
            className="w-3/4 sm:w-4/5 pl-3 placeholder:text-gray-500 py-2 rounded-r-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#4E46B4] text-sm sm:text-base"
          />
        </div>

        {showOtpInput && (
          <div
            className="transition-all duration-500 ease-in-out opacity-0 translate-y-4"
            style={{
              opacity: showOtpInput ? 1 : 0,
              transform: showOtpInput ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              maxLength={6}
              className="w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4] text-sm sm:text-base"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md hover:bg-[#3D3691] transition duration-300 text-sm sm:text-base"
        >
          {showOtpInput ? "Verify OTP" : "Send OTP"}
        </button>
      </form>

      <p className="text-center text-xs sm:text-sm text-purple-700 pt-4 sm:pt-6">
        <button onClick={onNext} className="hover:underline">
          Login through <b>Email</b>
        </button>
      </p>
      <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          className="font-medium text-[#4E46B4] hover:underline"
          onClick={onSignup}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default LoginWithPhone;

