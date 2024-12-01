'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function StatsComponent() {
  const token = localStorage.getItem("access_token");
  const [stats, setStats] = useState({
    percentageCorrect: "",
    percentageIncorrect: "",
    totalCorrect: "",
    totalIncorrect: "",
    totalQuestions: "",
  });

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
        setStats({
          percentageCorrect: data?.data?.percentageCorrect || 0,
          percentageIncorrect: data?.data?.percentageIncorrect || 0,
          totalCorrect: data?.data?.totalCorrect || 0,
          totalIncorrect: data?.data?.totalIncorrect || 0,
          totalQuestions: data?.data?.totalQuestions || 0,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [token]);

  const AnimatedCounter = ({ value, label }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <motion.span
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
      <span className="text-sm sm:text-base text-gray-600 mt-2 text-center">{label}</span>
    </motion.div>
  );

  const PieChart = ({ correct, incorrect, total }) => {
    const correctAngle = (correct / total) * 360;
    const incorrectAngle = (incorrect / total) * 360;

    return (
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d={`M50 50 L50 0 A50 50 0 ${correctAngle > 180 ? 1 : 0} 1 ${50 + 50 * Math.sin(correctAngle * Math.PI / 180)} ${50 - 50 * Math.cos(correctAngle * Math.PI / 180)} Z`}
            fill="#9F7AEA"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.path
            d={`M50 50 L${50 + 50 * Math.sin(correctAngle * Math.PI / 180)} ${50 - 50 * Math.cos(correctAngle * Math.PI / 180)} A50 50 0 ${incorrectAngle > 180 ? 1 : 0} 1 ${50 + 50 * Math.sin((correctAngle + incorrectAngle) * Math.PI / 180)} ${50 - 50 * Math.cos((correctAngle + incorrectAngle) * Math.PI / 180)} Z`}
            fill="#805AD5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {total}
          </motion.span>
        </div>
      </div>
    );
  };

  const ChartLabel = ({ color, label, value }) => (
    <div className="flex items-center mb-2">
      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2`} style={{ backgroundColor: color }}></div>
      <span className="text-xs sm:text-sm text-gray-600">{label}: {value}</span>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-800 mb-6 sm:mb-8 text-center">
        Your Quiz Statistics
      </h2>
      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <PieChart
            correct={stats.totalCorrect}
            incorrect={stats.totalIncorrect}
            total={stats.totalQuestions}
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:gap-4">
            <ChartLabel color="#9F7AEA" label="Correct" value={stats.totalCorrect} />
            <ChartLabel color="#805AD5" label="Incorrect" value={stats.totalIncorrect} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <AnimatedCounter value={stats.totalCorrect} label="Correct Answers" />
            <AnimatedCounter value={stats.totalIncorrect} label="Incorrect Answers" />
            <AnimatedCounter
              value={`${(stats.percentageCorrect || 0).toFixed(2)}%`}
              label="Success Rate"
            />
            <AnimatedCounter
              value={`${(stats.percentageIncorrect || 0).toFixed(2)}%`}
              label="Failure Rate"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsComponent;

