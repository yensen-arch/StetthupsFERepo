import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
} from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          User Settings
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <FaUserCircle className="text-2xl text-purple-600" />
            <div>
              <p className="text-sm font-medium text-left text-gray-600">
                Name
              </p>
              <p className="text-lg font-bold">
                {user.first_name} {user.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <FaEnvelope className="text-2xl text-blue-600" />
            <div>
              <p className="text-sm text-left font-medium text-gray-600">
                Email
              </p>
              <p className="text-lg font-bold">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <FaPhone className="text-2xl text-green-600" />
            <div>
              <p className="text-sm text-left font-medium text-gray-600">
                Phone
              </p>
              <p className="text-lg font-bold">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <FaBirthdayCake className="text-2xl text-red-600" />
            <div>
              <p className="text-sm text-left font-medium text-gray-600">
                Birth Date
              </p>
              <p className="text-lg font-bold">{user.birth_date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <AiOutlineFieldTime className="text-2xl text-indigo-600" />
            <div>
              <p className="text-sm text-left font-medium text-gray-600">
                Preparation
              </p>
              <p className="text-lg font-bold">{user.preparing_for}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/forgot-password")}
            className="my-8 text-lg text-white p-2 rounded-lg font-bold bg-purple-800 hover:bg-purple-900 transition-colors duration-300"
          >
            Change Password
          </button>
          <Link to="/aboutus">
            <button className="my-8 text-lg text-white p-2 rounded-lg font-bold bg-purple-800 hover:bg-purple-900 transition-colors duration-300">
              About Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
