'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function StatsComponent() {
  const token = localStorage.getItem("access_token");
  const [stats, setStats] = useState({
    percentageCorrect: 26.09,
    percentageIncorrect: 73.91,
    totalCorrect: 12,
    totalIncorrect: 34,
    totalQuestions: 46
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-800"
      >
        {value}
      </motion.span>
      <span className="text-lg sm:text-xl text-gray-600 mt-2">{label}</span>
    </motion.div>
  );

  const DonutChart = ({ percentage }) => {
    const validPercentage = percentage || 0; // Fallback to 0 if percentage is undefined or null

    return (
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="10"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="10"
            strokeDasharray={`${validPercentage} ${100 - validPercentage}`}
            strokeDashoffset="25"
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: `${validPercentage} ${100 - validPercentage}` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl font-bold text-purple-800"
          >
            {validPercentage.toFixed(1)}%
          </motion.span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 lg:p-16 bg-white min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-8 sm:mb-12 text-center">
        Your Quiz Statistics
      </h2>
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-around gap-12">
        <div className="mb-8 md:mb-0 text-center">
          <h3 className="text-2xl font-semibold text-purple-800 mb-4">Correct vs Incorrect</h3>
          <DonutChart percentage={stats.percentageCorrect} />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-purple-800 mb-6">Quiz Overview</h3>
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <AnimatedCounter value={stats.totalCorrect} label="Correct Answers" />
            <AnimatedCounter value={stats.totalIncorrect} label="Incorrect Answers" />
            <AnimatedCounter value={stats.totalQuestions} label="Total Questions" />
            <AnimatedCounter
              value={(stats.percentageCorrect || 0).toFixed(2) + '%'}
              label="Success Rate"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsComponent;
