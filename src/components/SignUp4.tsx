"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function SignUp4({ onNext, onInputChange }) {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only the last character is added
    setOtp(newOtp);

    // Focus next input field if the current one is filled
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join(""); // Combine the array into a single string
    console.log("email OTP as string:", otpString); // Save or handle OTP
    onNext(); // Proceed to the next step
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      className="w-[450px] h-auto max-w-md bg-white rounded-3xl shadow-xl px-12 py-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-[#4E46B4] mb-4 text-center">
        Verify Email
      </h2>
      <div className="flex gap-4 justify-center">
        {otp.map((value, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value, idx)}
            maxLength={1}
            className={`w-14 h-14 bg-slate-100 border-2 rounded-md text-center text-xl font-semibold focus:outline-none 
              ${value ? "border-[#4E46C4]" : "border-gray-200"} 
              focus:ring-2 focus:ring-[#4E46B4]`}
          />
        ))}
      </div>
      <p className="text-sm text-right">Resend OTP</p>
      <div className="flex gap-4">
        <button
          onClick={handleVerify}
          className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md hover:bg-[#3D3691] transition duration-300"
        >
          Verify
        </button>
      </div>
    </motion.div>
  );
}
