import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginCard({ onNext, throughPhone }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = (email, password) => {
    axios
      .post(`https://admin.stetthups.com/api/v1/email/login`, { email, password })
      .then((response) => {
        navigate("/");
        toast.success("Login successful!");
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        toast.success("Welcome Back!");
        setErrorMessage("");
      })
      .catch((error) => {
        console.log("Login error:", error);
        toast.error("Login failed!");
        setErrorMessage("Email or Password doesn't match.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-6 py-6 sm:w-[450px] sm:px-12">
      <h2 className="text-3xl font-bold text-[#4E46B4] mb-4 text-center">Login</h2>
      <h3 className="font-semibold text-gray-800 mb-8 text-center">Sign in to your account</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className={`w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 ${
              errorMessage ? "focus:ring-red-500" : "focus:ring-[#4E46B4]"
            }`}
            required
          />
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 ${
              errorMessage ? "focus:ring-red-500" : "focus:ring-[#4E46B4]"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-[#4E46B4] focus:ring-[#4E46B4] border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember Me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-[#4E46B4] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md hover:bg-[#3D3691] transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="text-center text-sm text-purple-700 pt-4 ">
        <button onClick={throughPhone} className="hover:underline ">
          Login through <b>Mobile Number</b>{" "}
        </button>
      </p>
      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          className="font-medium text-[#4E46B4] hover:underline"
          onClick={onNext}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default LoginCard;
