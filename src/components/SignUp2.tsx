"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface College {
  id: number;
  college_name: string;
  created_at: string;
  updated_at: string;
}

export function SignUp2({ onNext, onBack, onInputChange, formData }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://admin.stetthups.com/api/v1/get/state/city"
        );
        setStates(response.data.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(
          "https://admin.stetthups.com/api/v1/get/colleges"
        );
        setColleges(response.data.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };
    fetchColleges();
  }, []);

  useEffect(() => {
    if (formData.State) {
      const selected = states.find(
        (state) => state.id === parseInt(formData.State)
      );
      setCities(selected ? selected.cities : []);
    }
  }, [formData.State, states]);

  const handleStateChange = (e) => {
    const value = e.target.value;

    // Update state and cities
    const selected = states.find((state) => state.id === parseInt(value));
    setCities(selected ? selected.cities : []);

    // Update parent formData
    onInputChange({ State: value, City: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "City") {
      const selectedCity = cities.find(city => city.id === parseInt(value));
      onInputChange({ [name]: selectedCity ? selectedCity.id.toString() : "" });
    } else if (name === "CollegeName") {
      const selectedCollege = colleges.find(college => college.id === parseInt(value));
      onInputChange({ [name]: selectedCollege ? selectedCollege.id.toString() : "" });
    } else {
      onInputChange({ [name]: value });
    }
  };

  const isFormValid = () => {
    const stateValue = document.querySelector('select[name="State"]')?.value;
    const cityValue = document.querySelector('select[name="City"]')?.value;
    const collegeNameValue = document.querySelector(
      'select[name="CollegeName"]'
    )?.value;
    const currentYearValue = document.querySelector(
      'select[name="CurrentYear"]'
    )?.value;

    return stateValue && cityValue && collegeNameValue && currentYearValue;
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
          value={formData.State}
          name="State"
          onChange={handleStateChange}
          className="w-full text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.state_name}
            </option>
          ))}
        </select>
        <select
          name="City"
          value={formData.City}
          onChange={handleInputChange}
          className="w-full text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>
        <select
          name="CollegeName"
          value={formData.CollegeName}
          onChange={handleInputChange}
          className="w-full text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
        >
          <option value="">Select College</option>
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.college_name}
            </option>
          ))}
        </select>
        <select
          name="CurrentYear"
          value={formData.CurrentYear}
          onChange={handleInputChange}
          className="w-full text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4]"
        >
          <option value="">Select Current Year</option>
          <option value="1st year">1st year</option>
          <option value="2nd year">2nd year</option>
          <option value="3rd year">3rd year</option>
          <option value="Final Year">Final Year</option>
          <option value="Intern">Intern</option>
          <option value="Post Intern">Post Intern</option>
        </select>
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
          disabled={!isFormValid()}
          className="w-full bg-[#4E46B4] text-white py-2 px-4 rounded-md disabled:bg-[#B3A0D4] disabled:cursor-not-allowed hover:bg-[#3D3691] transition duration-300"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}

