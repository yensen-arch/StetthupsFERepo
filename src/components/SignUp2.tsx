"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface College {
  id: number;
  college_name: string;
  created_at: string;
  updated_at: string;
}

interface City {
  id: number;
  city_name: string;
}

interface State {
  id: number;
  state_name: string;
  cities: City[];
}

export function SignUp2({ onNext, onBack, onInputChange, formData }) {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRefs = {
    State: useRef<HTMLDivElement>(null),
    City: useRef<HTMLDivElement>(null),
    CollegeName: useRef<HTMLDivElement>(null),
    CurrentYear: useRef<HTMLDivElement>(null),
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownRef = dropdownRefs[openDropdown];
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleStateChange = (value: string) => {
    const selected = states.find((state) => state.id === parseInt(value));
    setCities(selected ? selected.cities : []);
    onInputChange({ State: value, City: "" });
    setOpenDropdown(null);
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "City") {
      const selectedCity = cities.find((city) => city.id === parseInt(value));
      onInputChange({ [name]: selectedCity ? selectedCity.id.toString() : "" });
    } else if (name === "CollegeName") {
      const selectedCollege = colleges.find(
        (college) => college.id === parseInt(value)
      );
      onInputChange({
        [name]: selectedCollege ? selectedCollege.id.toString() : "",
      });
    } else {
      onInputChange({ [name]: value });
    }
    setOpenDropdown(null);
  };

  const isFormValid = () => {
    return (
      formData.State &&
      formData.City &&
      formData.CollegeName &&
      formData.CurrentYear
    );
  };

  const CustomDropdown = ({ name, options, value, onChange }) => {
    const isOpen = openDropdown === name;
    const toggleDropdown = () => setOpenDropdown(isOpen ? null : name);

    return (
      <div ref={dropdownRefs[name]} className="relative w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full text-left text-gray-500 px-3 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46B4] transition duration-300"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {value
            ? options.find((opt) => opt.id.toString() === value)?.name ||
              "Select"
            : `Select ${name}`}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto bottom-full mb-1"
              role="listbox"
            >
              {options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => onChange(option.id.toString())}
                  className="px-3 py-2 cursor-pointer hover:bg-slate-100 transition duration-300"
                  role="option"
                  aria-selected={value === option.id.toString()}
                >
                  {option.name}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      className="w-6/7 h-auto max-w-md bg-white rounded-3xl shadow-xl px-4 md:px-12 py-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-[#4E46B4] mb-4 text-center">
        Sign Up
      </h2>
      <h3 className="font-semibold text-gray-800 mb-8 text-center">
        Let's get you setup for success
      </h3>
      <div className="space-y-4">
        <CustomDropdown
          name="State"
          options={states.map((state) => ({
            id: state.id,
            name: state.state_name,
          }))}
          value={formData.State}
          onChange={(value) => handleStateChange(value)}
        />
        <CustomDropdown
          name="City"
          options={cities.map((city) => ({
            id: city.id,
            name: city.city_name,
          }))}
          value={formData.City}
          onChange={(value) => handleInputChange("City", value)}
        />
        <div className="relative z-20 space-y-4">
          <CustomDropdown
            name="CollegeName"
            options={colleges.map((college) => ({
              id: college.id,
              name: college.college_name,
            }))}
            value={formData.CollegeName}
            onChange={(value) => handleInputChange("CollegeName", value)}
          />
          <CustomDropdown
            name="CurrentYear"
            options={[
              { id: "1st year", name: "1st year" },
              { id: "2nd year", name: "2nd year" },
              { id: "3rd year", name: "3rd year" },
              { id: "Final Year", name: "Final Year" },
              { id: "Intern", name: "Intern" },
              { id: "Post Intern", name: "Post Intern" },
            ]}
            value={formData.CurrentYear}
            onChange={(value) => handleInputChange("CurrentYear", value)}
          />
        </div>
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
