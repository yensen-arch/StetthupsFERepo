"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function SignUp1({ onNext, onInputChange, formData, onBack }) {
  const [inputData, setInputData] = useState({
    FirstName: formData.FirstName,
    LastName: formData.LastName,
    Email: formData.Email,
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
    <div className="relative group w-full max-w-md mx-auto px-4 sm:px-6 md:px-8">
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#4E46B4] mb-4 text-center">
          Sign Up
        </h2>
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
          Let's get you setup for success
        </h3>
        <form className="space-y-4 sm:space-y-6">
          <div>
            <input
              type="text"
              placeholder="First Name"
              onChange={handleInputChange}
              name="FirstName"
              value={formData.FirstName}
              className="w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
              aria-label="First Name"
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
              aria-label="Last Name"
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
              aria-label="Email Address"
            />
          </div>
          <div className="flex">
            <span className="w-1/4 sm:w-1/5 pl-2 sm:pl-4 pr-1 py-2 bg-slate-100 rounded-l-md text-sm sm:text-base flex items-center justify-center">
               +91
            </span>
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={handleInputChange}
              name="PhoneNumber"
              value={formData.PhoneNumber}
              className="w-3/4 sm:w-4/5 pl-3 placeholder:text-gray-500 py-2 bg-slate-100 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
              aria-label="Phone Number"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={onBack}
              type="button"
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 text-sm sm:text-base"
            >
              Back
            </button>
            <button
              onClick={onNext}
              type="button"
              disabled={!isFormValid}
              className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md disabled:bg-[#B3A0D4] disabled:cursor-not-allowed hover:bg-[#3D3691] transition duration-300 text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

