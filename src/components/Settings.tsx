import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
} from "react-icons/fa";
import { MdSchool, MdLocationCity } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user from localStorage
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      console.log(oldPassword, newPassword);
      const response = await fetch(
        "https://admin.stetthups.com/api/v1/change/password",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully.");
        toast.success("Password changed successfully.");
      } else {
        const error = await response.json();
        setMessage(error.message || "Password change failed.");
        toast.error(error.message || "Password change failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  };

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
              <p className="text-sm font-medium text-gray-600">Name</p>
              <p className="text-lg font-bold">
                {user.first_name} {user.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <FaEnvelope className="text-2xl text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-lg font-bold">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <FaPhone className="text-2xl text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-lg font-bold">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <FaBirthdayCake className="text-2xl text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Birth Date</p>
              <p className="text-lg font-bold">{user.birth_date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md">
            <AiOutlineFieldTime className="text-2xl text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Preparation</p>
              <p className="text-lg font-bold">{user.preparing_for}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/forgot-password")}
          className="mt-4 text-lg text-white p-2 rounded-lg font-bold bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default Settings;
