import React, { useState } from "react";
import DashComponent from "../components/DashComponent.tsx";
import StudyComponent from "../components/StudyComponent.tsx";
import StatsComponent from "../components/StatsComponent.tsx";
import Settings from "../components/Settings.tsx";
import Sidebar from "../components/Sidebar.tsx";

function UserDashboard() {
  // Set "Dashboard" as the default active button
  const [activeButton, setActiveButton] = useState();

  const renderActiveComponent = () => {
    switch (activeButton) {
      case "Study":
        return <StudyComponent />;
      case "Statistics":
        return <StatsComponent />;
      case "Settings":
        return <Settings />;
      default:
        return <DashComponent />;
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
