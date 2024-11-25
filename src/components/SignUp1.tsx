"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function SignUp1({ onNext, onInputChange,formData,onBack }) {
  const [inputData, setInputData] = useState({
    FirstName: formData.FirstName,    
    LastName: formData.LastName,
    Email:    formData.Email,
    PhoneNumber: formData.PhoneNumber,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange({ [name]: value });
    setInputData((prev) => {
      const updatedData = { ...prev, [name]: value };
      return updatedData;
    });
  };
  const isFormValid = Object.values(inputData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="relative group">
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        className="w-[450px] h-[620px] max-w-md bg-white rounded-3xl shadow-xl px-12 py-6"
      >
        <h2 className="text-3xl font-bold text-[#4E46B4] mb-4 text-center">
          Sign Up
        </h2>
        <h3 className="font-semibold text-gray-800 mb-8 text-center">
          Let’s get you setup for success{" "}
        </h3>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="First Name"
              onChange={handleInputChange}
              name="FirstName"
              value={formData.FirstName}
              className="w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              onChange={handleInputChange}
              name="LastName"
              value={formData.LastName}
              className="w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              onChange={handleInputChange}
              name="Email"
              value={formData.Email}
              className="w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
            />
          </div>
          <div>
            <span className="w-[20%] pl-4 pr-1 py-2 bg-slate-100 rounded-md focus:outline-none rounded-r-none">
              🇮🇳 +91
            </span>
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={handleInputChange}
              name="PhoneNumber"
              value={formData.PhoneNumber}
              className="w-[80%] pl-3 placeholder:text-gray-500 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
            />
          </div>
          <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md disabled:bg-[#B3A0D4] disabled:cursor-not-allowed hover:bg-[#3D3691] transition duration-300"
        >
          Next
        </button>
      </div>{" "}
        </form>
      </motion.div>
    </div>
  );
}
