import React, { useEffect } from "react";
import Image from "../assets/Girl.png";
import Events from "./events.tsx";
import Progress from "./Progress.tsx";
const mockEvents = [
  // your mock events here...
];

function DashComponent() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          "https://admin.stetthups.com/api/v1/get/statistics",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("stats", data.data); // Logs the content
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [token]);

  return (
    <div className="flex-grow">
      <div className="p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#4A0E78] to-[#6739B7] rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="space-y-2 mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                Welcome back, Dr. {user?.first_name || "User"}
                <span role="img" aria-label="waving hand" className="text-6xl">
                  👋
                </span>
              </h1>
              <div className="text-white/90">
                <p className="text-lg">
                  You've learned <span className="font-semibold">70%</span> of
                  your goal this week!
                </p>
                <p className="text-sm mt-1">
                  Keep it up and improve your progress.
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={Image}
                alt="Doctor illustration"
                className="object-contain w-[250px] h-[150px]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-full flex justify-end">
          {/* Continue Learning Section */}
          <div className="col-span-full flex justify-end">
            <Progress/>
            <Events />
          </div>
        </div>
        

        {/* Events Section */}
      </div>
    </div>
  );
}

export default DashComponent;
