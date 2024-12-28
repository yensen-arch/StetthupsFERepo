"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

export function SignUp5({ onBack, phoneNumber, formData }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const apiPayload = {
    first_name: formData.FirstName,
    last_name: formData.LastName,
    email: formData.Email,
    phone: formData.PhoneNumber,
    password: formData.password,
    state_id: formData.State,
    city_id: formData.City,
    college_id: formData.CollegeName,
    current_year: formData.CurrentYear,
    birth_date: formData.dob, // Ensure it's in 'YYYY-MM-DD' format
    preparing_for: formData.examPreference || "", // Optional
    interested_field: formData.interestedField || "", // Optional
  };

  const handleInputChange = (value, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1); // Ensure only the last character is added
    setOtp(newOtp);

    // Auto-focus next input field if the current one is filled
    if (value && idx < otp.length - 1) {
      document.getElementById(`otp-${idx + 1}`).focus();
    }
  };

  const resendOtp = () => {
    axios
      .post(`https://admin.stetthups.com/api/v1/send/otp?phone=${phoneNumber}`)
      .then((response) => {
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "OTP sending failed!");
        console.log(error.response.data);
      });
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (!phoneNumber) {
      console.error("Phone number is missing!");
      toast.error("Phone number is missing!");
      return;
    }

    axios
      .post(
        `https://admin.stetthups.com/api/v1/verify/otp?phone=${phoneNumber}`,
        {
          otp: otpString,
        }
      )
      .then((response) => {
        toast.success("OTP verified successfully!");

        const registerUser = async () => {
          try {
            const response = await axios.post(
              "https://admin.stetthups.com/api/v1/register",
              apiPayload
            );
            toast.success("User registered successfully!");
            localStorage.setItem(
              "access_token",
              response.data.data.access_token
            );
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.user)
            );
            toast.success("Welcome Back!");
            window.location.href = "/userdashboard";
          } catch (error) {
            if (typeof error === "object") {
              // Convert the object error messages into a readable string
              const errorMessages = Object.values(error).flat().join(", ");
              toast.error(errorMessages || "User registration failed!");
            }
            console.log(error.response.data);
          }
        };
        registerUser();
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "OTP verification failed!"
        );
        console.log(error.response.data);
      });
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      className="w-full max-w-[450px] h-auto bg-white rounded-3xl shadow-xl px-6 sm:px-12 py-6 space-y-6 mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#4E46B4] mb-4 text-center">
        Verify Mobile
      </h2>
      <div className="flex gap-2 sm:gap-4 justify-center">
        {otp.map((value, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value, idx)}
            maxLength={1}
            className={`w-10 h-10 sm:w-14 sm:h-14 bg-slate-100 border-2 rounded-md text-center text-lg sm:text-xl font-semibold focus:outline-none 
              ${value ? "border-[#4E46B4]" : "border-gray-200"} 
              focus:ring-2 focus:ring-[#4E46B4]`}
          />
        ))}
      </div>
      <p className="text-sm text-right">
        <button className="hover:cursor-pointer" onClick={resendOtp}>
          Resend OTP
        </button>
      </p>
      <button
        onClick={handleVerify}
        className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md hover:bg-[#3D3691] transition duration-300"
      >
        Verify
      </button>
    </motion.div>
  );
  
}
