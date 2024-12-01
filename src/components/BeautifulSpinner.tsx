"use client";

import { motion } from "framer-motion";

const BeautifulSpinner = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="#9F7AEA"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          variants={{
            hidden: { pathLength: 0, rotate: 0 },
            visible: {
              pathLength: 1,
              rotate: 360,
              transition: {
                pathLength: { duration: 2, repeat: Infinity },
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              },
            },
          }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="#805AD5"
          variants={{
            hidden: { scale: 0 },
            visible: {
              scale: [0, 1, 0],
              transition: { duration: 1, repeat: Infinity, repeatDelay: 0.5 },
            },
          }}
        />
      </motion.svg>
    </div>
  );
};

export default BeautifulSpinner;
