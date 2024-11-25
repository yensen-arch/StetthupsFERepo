"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

export function SignUp3({ onNext, onBack, onInputChange, formData }) {
  const [isChecked, setIsChecked] = useState(formData.agreeToTerms || false);
  const [isConfirmPassValid, setIsConfirmPassValid] = useState(true);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPassVisible, setConfirmPassVisible] = useState(false); // State for confirm password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPassVisible(!confirmPassVisible);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange({ [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    onInputChange({ agreeToTerms: e.target.checked });
  };

  const handlePassCheck = (e) => {
    const { name, value } = e.target;
    onInputChange({ [name]: value });

    if (name === "confirmPassword") {
      setIsConfirmPassValid(value === formData.password);
    }
  };

  const isFormValid = () => {
    const password = formData.password || "";
    const confirmPassword = formData.confirmPassword || "";
    return (
      formData.examPreference &&
      formData.dob &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      isChecked
    );
  };

  const handleApiCall = async () => {
    const payload = {
      first_name: formData.FirstName,
      last_name: formData.LastName,
      email: formData.Email,
      phone: formData.PhoneNumber,
      password: formData.password,
      state_id: formData.State,
      city_id: formData.City,
      college_id: formData.CollegeName,
      current_year: formData.CurrentYear,
      birth_date: formData.dob,
      interested: formData.examPreference,
      preparing_for: formData.examPreference,
    };

    const response = await fetch(
      "https://admin.stetthups.com/api/v1/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success("User registered successfully!");
      navigate("/");
    } else {
      toast.error("User registration failed!");
      console.error("Error:", data);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      className="w-[450px] h-auto max-w-md bg-white rounded-3xl shadow-xl px-12 py-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-[#4E46B4] mb-4 text-center">
        Sign Up
      </h2>
      <h3 className="font-semibold text-gray-800 mb-8 text-center">
        Let's get you setup for success
      </h3>
      <div className="space-y-4">
        <select
          name="examPreference"
          value={formData.examPreference || ""}
          onChange={handleInputChange}
          className="w-full text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
        >
          <option value="" disabled>
            Preparing For
          </option>
          <option value="Anatomy">Anatomy</option>
          <option value="Physiology">Physiology</option>
          <option value="Biochemistry">Biochemistry</option>
          <option value="Microbiology">Microbiology</option>
          <option value="Pathology">Pathology </option>
          <option value="Forensic Medicine">Forensic Medicine </option>
          <option value="Preventive and social medicine">
            Preventive and social medicine{" "}
          </option>
          <option value="E.N.T">E.N.T</option>
          <option value="Ophthalmology">Ophthalmology </option>
          <option value="MEDICINE">MEDICINE </option>
          <option value="Psychiatry">Psychiatry </option>
          <option value="skin and venereology">Skin and venereology</option>
          <option value="Respiratory Medicine">Respiratory Medicine </option>
          <option value="Family Medicine">Family Medicine</option>
          <option value="Emergency Medicine">Emergency Medicine </option>
          <option value="Pediatrists">Pediatrists</option>
          <option value="Obstetrics and gynaecology">
            Obstetrics and gynaecology
          </option>
          <option value="Surgery">Surgery </option>
          <option value="Orthopaedics">Orthopaedics</option>
          <option value="Anesthesia">Anesthesia</option>
          <option value="Radiology">Radiology</option>
        </select>
        <input
          type="date"
          name="dob"
          value={formData.dob || ""}
          onChange={handleInputChange}
          className="w-full text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
        />
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password || ""}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="relative">
          <input
            type={confirmPassVisible ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword || ""}
            onChange={handlePassCheck}
            placeholder="Confirm Password"
            className={`w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 ${
              !isConfirmPassValid
                ? "ring-2 ring-red-500"
                : "focus:ring-[#4E46B4]"
            }`}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPassVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4 rounded border-gray-300 focus:ring-[#4E46B4]"
          />
          <span className="text-sm">I agree to the Terms & Conditions</span>
        </label>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (isFormValid()) {
              handleApiCall();
            }
          }}
          disabled={!isFormValid()}
          className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md disabled:bg-[#B3A0D4] disabled:cursor-not-allowed hover:bg-[#3D3691] transition duration-300"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
