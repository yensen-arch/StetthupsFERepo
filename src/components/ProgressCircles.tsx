"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Subject {
  id: number;
  subject_name: string;
  image_path: string;
}

interface SubjectData {
  subject: Subject;
  total_topics: number;
  completed_topics: number;
  is_completed: boolean;
}

interface SubscriptionPlan {
  id: number;
  subscription_name: string;
  price: number;
  duration: number;
}

function ProgressCircles() {
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://admin.stetthups.com/api/v1/master/api",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Send an empty object to get all subjects
          }
        );

        const data = await response.json();

        if (data.success) {
          setSubjectData(data.data);
        } else {
          setError(data.message || "Failed to fetch subject data");
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CircleProgress = ({
    percentage,
    color,
  }: {
    percentage: number;
    color: string;
  }) => {
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-16 h-16 flex-shrink-0">
        <div className="absolute inset-0 bg-gray-50 rounded-full shadow-inner" />

        <motion.svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle
            className="text-gray-100"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="32"
            cy="32"
          />
          <motion.circle
            className={color}
            strokeWidth="5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="32"
            cy="32"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-sm font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="p-6 max-w-[400px] border-2 shadow-xl  mx-auto bg-white rounded-xl text-left shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">
        Progress Report
      </h2>
      <div className="relative">
        <div
          className="max-h-[300px] overflow-y-auto pr-4 
 [&::-webkit-scrollbar]:w-2 
 [&::-webkit-scrollbar-thumb]:bg-blue-500 
 [&::-webkit-scrollbar-thumb]:rounded-full 
 [&::-webkit-scrollbar-track]:bg-gray-100 
 hover:[&::-webkit-scrollbar-thumb]:bg-blue-700"
        >
          <div className="relative mb-6">
            <motion.div
              className="absolute left-8 top-4 bottom-4 w-0.5 bg-blue-500"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            <div className="space-y-6">
              {subjectData.map((subject, index) => {
                const percentage = Math.round(
                  (subject.completed_topics / subject.total_topics) * 100
                );
                const colors = [
                  "text-blue-500",
                  "text-green-500",
                  "text-yellow-500",
                  "text-red-500",
                ];

                return (
                  <motion.div
                    key={subject.subject.id}
                    className="relative flex items-center gap-4 group"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CircleProgress
                      percentage={percentage}
                      color={colors[index % colors.length]}
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {subject.subject.subject_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {subject.completed_topics} of {subject.total_topics}{" "}
                        completed
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCircles;
