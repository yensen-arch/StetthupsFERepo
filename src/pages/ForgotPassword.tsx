import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || ""; // Ensure email exists
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sendOTP = async () => {
    try {
      const response = await axios.post(
        "https://admin.stetthups.com/api/v1/forget/password/email/otp",
        { email }
      );
      if (response.data.success) {
        toast.success("OTP sent to your email.");
        setSuccessMessage("OTP sent successfully. Please check your inbox.");
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message || "Failed to send OTP.");
        toast.error(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while sending OTP."
      );
      toast.error(
        error.response?.data?.message || "An error occurred while sending OTP."
      );
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", OTP);
      formData.append("password", password);

      const response = await axios.post(
        "https://admin.stetthups.com/api/v1/verify/otp/change/password",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        setSuccessMessage("Password reset successful. You can now log in.");
        setErrorMessage("");
        setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        
      } else {
        setErrorMessage(response.data.message || "Failed to reset password.");
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error verifying OTP. Try again."
      );
      toast.error(
        error.response?.data?.message || "Error verifying OTP. Try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform transition-all hover:scale-105 sm:p-12">
        <h2 className="text-4xl font-bold text-[#4E46B4] text-center mb-4">
          Forgot Password
        </h2>
        <form onSubmit={verifyOTP} className="space-y-6">
          <div>
            <input
              id="OTP"
              type="text"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter Your OTP"
              className={`w-full placeholder:text-gray-500 px-4 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 ${
                errorMessage ? "focus:ring-red-500" : "focus:ring-[#4E46B4]"
              }`}
              required
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
              className="w-full placeholder:text-gray-500 px-4 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-xs mt-1">{successMessage}</p>
          )}
          <button
            onClick={sendOTP}
            type="button"
            className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md shadow-lg hover:bg-[#3D3691] hover:shadow-xl transition duration-300 mb-6"
          >
            Send OTP
          </button>
          <button
            type="submit"
            className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md shadow-lg hover:bg-[#3D3691] hover:shadow-xl transition duration-300"
          >
            Verify OTP & Reset Password
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-[#4E46B4] hover:underline transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
