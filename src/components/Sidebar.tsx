import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import FullLogo from "../assets/Fulllogo.png";
import UnionDark from "../assets/UnionDark.png";
import UnionLight from "../assets/Union.png";
import SettingsDark from "../assets/settings_dark.png";
import SettingsLight from "../assets/settings_light.png";
import StudyLight from "../assets/StudyLight.png";
import StudyDark from "../assets/StudyDark.png";
import StatsWhite from "../assets/StatsWhite.png";
import StatsBlack from "../assets/StatsBlack.png";
const Sidebar = ({ activeButton, setActiveButton }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1080);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleButtonClick =  (buttonName) => {
     setActiveButton(buttonName);
     navigate("/", { state: { activeButton: buttonName } }); // Pass activeButton via state
    };
  

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const buttonData = [
    { name: "Dashboard", darkIcon: UnionDark, lightIcon: UnionLight },
    { name: "Study", darkIcon: StudyLight, lightIcon: StudyDark },
    {
      name: "Statistics",
      darkIcon: StatsBlack,
      lightIcon: StatsWhite,
    },
    { name: "Settings", darkIcon: SettingsLight, lightIcon: SettingsDark },
  ];

  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    collapsed: {
      width: "80px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    mobile: {
      width: "100%",
      height: "64px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    expanded: {
      marginLeft: "240px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    collapsed: {
      marginLeft: "80px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    mobile: {
      marginLeft: "0",
      marginBottom: "64px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    expanded: {
      justifyContent: "flex-start",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    collapsed: {
      justifyContent: "center",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    mobile: {
      justifyContent: "center",
      flexDirection: "column" as "column",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const accessToken = localStorage.getItem("access_token");

  const handleLogout = () => {
    fetch("https://admin.stetthups.com/api/v1/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <motion.aside
        initial={isMobile ? "mobile" : "expanded"}
        animate={isMobile ? "mobile" : isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        className={`
          ${isMobile ? "bg-[#6739B7]" : "bg-[#E7E9F7]"}
          shadow-md flex
          transition-all duration-300 ease-in-out
          ${
            isMobile
              ? "fixed bottom-0 left-0 right-0 h-16 z-1000 px-0 py-0 w-full"
              : "h-screen fixed top-0 left-0 z-10000 flex-col"
          }
          overflow-hidden
        `}
      >
        {!isMobile && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6 border-b border-[#D1C4E9]"
              >
                <img
                  src={FullLogo}
                  alt="Stethups Logo"
                  className="w-full max-w-[240px] h-18 mb-8 pt-6"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <nav
          className={`
          flex 
          ${
            isMobile
              ? "flex-row justify-around items-center h-full w-full"
              : "flex-col flex-grow"
          } 
          ${isExpanded && !isMobile ? "p-6" : "p-2"} 
          ${!isMobile && "gap-8"}
        `}
        >
          {buttonData.map((button) => (
            <motion.button
              key={button.name}
              onClick={() => handleButtonClick(button.name)}
              variants={buttonVariants}
              initial={isMobile ? "mobile" : "expanded"}
              animate={
                isMobile ? "mobile" : isExpanded ? "expanded" : "collapsed"
              }
              className={`
                ${isMobile ? "p-0 flex-1" : "p-4"} 
                rounded-xl font-semibold text-base 
                flex items-center transition-all duration-300
                ${
                  activeButton === button.name
                    ? isMobile
                      ? "text-white"
                      : "bg-[#6739B7] text-white"
                    : isMobile
                    ? "text-white/70 hover:text-white"
                    : "bg-transparent text-black hover:bg-[#D1C4E9]"
                }
                ${isMobile ? "flex-col justify-center" : "w-full"}
              `}
            >
              <img
               src={
                activeButton === button.name
                  ? button.lightIcon 
                  : button.darkIcon  
              }
              
                alt={`${button.name} icon`}
                className={`
                  ${isMobile ? "w-6 h-6" : "w-7 h-7"} 
                  flex-shrink-0
                `}
              />
              {!isMobile && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 text-base whitespace-nowrap overflow-hidden"
                    >
                      {button.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              )}
            </motion.button>
          ))}
        </nav>

        {!isMobile && (
          <>
            <motion.div
              className="mt-auto flex justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={toggleSidebar}
                className={`p-2 bg-[#6739B7] rounded-full text-white transform transition-all duration-300 ease-in-out ${
                  isExpanded ? "" : "translate-x-1/2"
                }`}
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
            </motion.div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 border-t border-[#D1C4E9]"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full bg-[#6739B7] text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 hover:bg-[#5B2AA8] shadow-md"
                  >
                    Logout
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.aside>
      <motion.div
        initial={isMobile ? "mobile" : "expanded"}
        animate={isMobile ? "mobile" : isExpanded ? "expanded" : "collapsed"}
        variants={contentVariants}
        className={`
          transition-all duration-300 ease-in-out
          ${isMobile ? "pb-16" : ""}
        `}
      >
        {/* Your main content goes here */}
      </motion.div>
    </>
  );
};

export default Sidebar;
