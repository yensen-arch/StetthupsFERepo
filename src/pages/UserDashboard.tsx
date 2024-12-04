import React, { useState } from "react";
import DashComponent from "../components/DashComponent.tsx";
import StudyComponent from "../components/StudyComponent.tsx";
import StatsComponent from "../components/StatsComponent.tsx";
import Settings from "../components/Settings.tsx";
import Sidebar from "../components/Sidebar.tsx";
import { useLocation } from "react-router-dom";

function UserDashboard() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(
    location.state?.activeButton || "Dashboard"
  );

  const renderActiveComponent = () => {
    switch (activeButton) {
      case "Study":
        return <StudyComponent />;
      case "Statistics":
        return <StatsComponent />;
      case "Settings":
        return <Settings />;
      default:
        return <DashComponent setActiveButton={setActiveButton} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar activeButton={activeButton} setActiveButton={setActiveButton} />
      {/* Main Content */}
      <main className="flex-grow bg-gray-50 px-2 py-4">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default UserDashboard;
