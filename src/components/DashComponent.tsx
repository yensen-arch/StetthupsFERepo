import React, { useEffect, useState } from "react";
import Image from "../assets/Girl.png";
import Events from "./events.tsx";
import Progress from "./Progress.tsx";

function DashComponent({ setActiveButton }) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1080);
  const [studyData, setStudyData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1080);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex-grow">
      <div>
        {/* Welcome Banner */}
        <div
          className={`rounded-2xl py-1 mb-8 relative overflow-hidden text-left
            text-black md:px-8 md:bg-gradient-to-r md:from-[#4A0E78] md:to-[#6739B7] 
            md:text-white transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row justify-between items-left">
            {/* Responsive View */}
            <div className="bg-purple-800 rounded-lg block md:hidden py-4 px-1">
              <h1 className="text-white text-3xl font-bold">
                Welcome,{" "}
                <span className="text-white font-bold">
                  Dr. {user?.first_name || "User"}
                </span>
              </h1>
            </div>

            {/* Desktop View */}
            <div className="hidden md:space-y-2 md:mb-4 md:mb-0 md:block">
              <h1
                className={`text-3xl font-bold flex items-center gap-2
      text-white md:flex-row md:justify-start`}
              >
                Welcome back, Dr. {user?.first_name || "User"}
                <span role="img" aria-label="waving hand" className="text-6xl">
                  👋
                </span>
              </h1>
              <div className={`text-white/90`}>
                <p className="text-lg text-left">Keep on Learning!</p>
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

        {/* Continue Learning Section */}
        <div className="flex w-full gap-0">
          <div className="flex-grow">
            <Progress
              setActiveButton={setActiveButton}
              setStudyData={setStudyData}
            />
          </div>
          {!isMobile && (
            <div className="w-[500px]">
              <Events />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashComponent;
