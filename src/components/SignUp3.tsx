"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function SignUp3({ onNext, onBack, onInputChange, formData }) {
  const [isChecked, setIsChecked] = useState(formData.agreeToTerms || false);
  const [isConfirmPassValid, setIsConfirmPassValid] = useState(true);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPassVisible(!confirmPassVisible);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

    try {
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
        navigate("/login");
      } else {
        toast.error("User registration failed!");
        console.error("Error:", data);
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
      console.error("Error:", error);
    }
  };

  const examOptions = [
    "Anatomy",
    "Physiology",
    "Biochemistry",
    "Microbiology",
    "Pathology",
    "Forensic Medicine",
    "Preventive and social medicine",
    "E.N.T",
    "Ophthalmology",
    "MEDICINE",
    "Psychiatry",
    "Skin and venereology",
    "Respiratory Medicine",
    "Family Medicine",
    "Emergency Medicine",
    "Pediatrists",
    "Obstetrics and gynaecology",
    "Surgery",
    "Orthopaedics",
    "Anesthesia",
    "Radiology",
  ];

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 space-y-6"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#4E46B4] mb-2 sm:mb-4 text-center">
        Sign Up
      </h2>
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-4 sm:mb-8 text-center">
        Let's get you setup for success
      </h3>
      <div className="space-y-4 sm:space-y-6">
        <div ref={dropdownRef} className="relative w-full">
          <button
            type="button"
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-full text-left text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4] transition duration-300 text-sm sm:text-base"
            aria-haspopup="listbox"
            aria-expanded={openDropdown}
          >
            {formData.examPreference || "Select Exam Preference"}
          </button>
          <AnimatePresence>
            {openDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                role="listbox"
              >
                {examOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      onInputChange({ examPreference: option });
                      setOpenDropdown(false);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-slate-100 transition duration-300 text-sm sm:text-base"
                    role="option"
                    aria-selected={formData.examPreference === option}
                  >
                    {option}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <input
            type="text"
            name="dob"
            value={formData.dob || ""}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = formData.dob ? "date" : "text")}
            placeholder="Date of Birth"
            className="w-full text-gray-500 placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4] text-sm sm:text-base"
          />
        </div>

        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password || ""}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full placeholder:text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4] text-sm sm:text-base"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
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
            } text-sm sm:text-base`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPassVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4 rounded border-gray-300 focus:ring-[#4E46B4]"
          />
          <span className="text-xs sm:text-sm">
            I agree to the Terms & Conditions
          </span>
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 text-sm sm:text-base"
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
          className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md disabled:bg-[#B3A0D4] disabled:cursor-not-allowed hover:bg-[#3D3691] transition duration-300 text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
