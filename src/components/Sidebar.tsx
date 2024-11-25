import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import FullLogo from "../assets/Fulllogo.png";
import ChartSquareDark from "../assets/chart-square.png";
import ChartSquareLight from "../assets/chart-square-light.png";
import PlayCircleLight from "../assets/play-circle.png";
import UnionDark from "../assets/UnionDark.png";
import UnionLight from "../assets/Union.png";
import PlayCircleDark from "../assets/play-circle-dark.png";

interface SidebarProps {
  activeButton: string;
  setActiveButton: (buttonName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeButton, setActiveButton }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    navigate("/"); // Navigate to the dashboard
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonData = [
    { name: "Dashboard", darkIcon: UnionDark, lightIcon: UnionLight },
    { name: "Study", darkIcon: PlayCircleDark, lightIcon: PlayCircleLight },
    { name: "Statistics", darkIcon: ChartSquareDark, lightIcon: ChartSquareLight, disabled: true }, // Disabled
    { name: "Settings", darkIcon: UnionDark, lightIcon: UnionLight },
  ];

  const sidebarVariants = {
    expanded: { width: "16rem", transition: { duration: 0.3 } },
    collapsed: { width: "3rem", transition: { duration: 0.3 } },
  };

  const accessToken = localStorage.getItem("access_token"); // Retrieve token from localStorage

 const handleLogout = () => {
    fetch("https://admin.stetthups.com/api/v1/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the token as Bearer

      },
      }
    ).then ((response) => {
      if (response.ok) {
        // Clear the token from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login"); 
      }
    });
  }
  return (
    <motion.aside
      initial="expanded"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className="bg-[#E7E9F7] shadow-md flex flex-col h-screen fixed top-0 left-0 z-50 overflow-hidden"
    >
      <motion.button
        onClick={toggleSidebar}
        className={`absolute top-4 ${isExpanded ? 'right-4' : 'left-1'} p-2 bg-[#6739B7] rounded-full text-white transform ${isExpanded ? '' : '-translate-x-1/2'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-6 h-6" />
        ) : (
          <ChevronRight className="w-6 h-6" />
        )}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6 border-b"
          >
            <img src={FullLogo} alt="Stethups Logo" className="w-full max-w-[240px] h-auto mb-8 pt-6" />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`flex flex-col ${isExpanded ? 'p-4' : 'p-2'} gap-6 flex-grow`}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {buttonData.map((button) => (
                <motion.button
                  key={button.name}
                  onClick={() => !button.disabled && handleButtonClick(button.name)} // Prevent clicks
                  disabled={button.disabled} // Disable the button
                  className={`text-left p-3 rounded-xl font-semibold text-base flex items-center transition-all duration-300 ${
                    button.disabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed" // Darker styling for disabled buttons
                      : activeButton === button.name
                      ? "bg-[#6739B7] text-white"
                      : "bg-transparent text-black hover:bg-[#D1C4E9]"
                  } w-full mb-2`}
                >
              
                  <img
                    src={activeButton === button.name ? button.lightIcon : button.darkIcon}
                    alt={`${button.name} icon`}
                    className="w-6 h-6 mr-3"
                  />
                  <span className="flex-grow text-left">{button.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 border-t mt-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full bg-[#6739B7] text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 hover:bg-[#5B2AA8]"
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Sidebar;

