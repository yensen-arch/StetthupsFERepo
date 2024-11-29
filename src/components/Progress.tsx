"use client";
import React, { useState, useEffect } from "react";
import BeautifulSpinner from "./BeautifulSpinner.tsx";
import { sub } from "framer-motion/client";
import { useNavigate } from "react-router-dom";


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

// Global variable for subject data
let subjectData: { [key: number]: SubjectData[] } = {};

function Progress({setActiveButton} ) {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionPlan[]>(
    []
  );
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
        const subscriptionResponse = await fetch(
          "https://admin.stetthups.com/api/v1/get/subscription/plan",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const subscriptionData = await subscriptionResponse.json();

        if (subscriptionData.success) {
          setSubscriptionData(subscriptionData.data);
          const subscriptionIds = subscriptionData.data.map(
            (item: SubscriptionPlan) => item.id
          );
          await fetchMasterData(token, subscriptionIds);
        } else {
          setError("Failed to fetch valid subscription data");
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

  const fetchMasterData = async (token: string, subscriptionIds: number[]) => {
    try {
      const apiCalls = subscriptionIds.map((id) =>
        fetch("https://admin.stetthups.com/api/v1/master/api", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription_id: id }),
        }).then((res) => res.json())
      );

      const responses = await Promise.all(apiCalls);

      const subjectDataMap: { [key: number]: SubjectData[] } = {};
      responses.forEach((response, index) => {
        if (response.success && response.data.length > 0) {
          subjectDataMap[subscriptionIds[index]] = response.data;
        }
      });

      const otherDataExists = Object.keys(subjectDataMap).some(
        (key) => parseInt(key) !== 1 && subjectDataMap[key]?.length > 0
      );

      // Remove data at index 1 if other data exists
      if (otherDataExists && subjectDataMap[1]?.length > 0) {
        delete subjectDataMap[1];
      }
      subjectData = subjectDataMap; // Set global subjectData variable
    } catch (err) {
      console.error("Error fetching master data:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-3/3">
        <BeautifulSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="">
      {(() => {
        const nonFreePlans = Object.entries(subjectData).filter(
          ([subscriptionId, subjects]) =>
            parseInt(subscriptionId) !== 0 && subjects.length > 0
        );

        if (nonFreePlans.length > 0) {
          // Render only non-free plans
          return nonFreePlans.map(([subscriptionId, subjects]) => (
            <div key={subscriptionId} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
                {subscriptionData.find((s) => s.id === parseInt(subscriptionId))
                  ?.subscription_name || "Unknown Subscription"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {subjects.slice(0, 12).map((subject) => (
                  <SubjectCard
                    key={subject.subject.id}
                    subject={subject}
                    subscriptionId={subscriptionId}
                    subjectData={subjectData}
                    setActiveButton={setActiveButton}
                  />
                ))}
              </div>
            </div>
          ));
        } else {
          // Handle case with no non-free plans
          return <div>No subscription data available.</div>;
        }
      })()}
    </div>
  );
}



function SubjectCard({
  subject,
  subscriptionId,
  subjectData,
  setActiveButton,
}: {
  subject: SubjectData;
  subscriptionId: string;
  subjectData: { [key: number]: SubjectData[] };
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClick = () => {
    setActiveButton("Study");
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
      onClick={handleClick}

    >
      <div className="flex items-center mb-4">
        <img
          src={subject.subject.image_path}
          alt={subject.subject.subject_name}
          className="w-14 h-14 rounded-full mr-2"
        />
        <h4 className="text-lg font-semibold text-gray-900">
          {subject.subject.subject_name}
        </h4>
      </div>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${
                (subject.completed_topics / subject.total_topics) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{subject.completed_topics} completed</span>
        <span>{subject.total_topics} total</span>
      </div>
    </div>
  );
}

export default Progress;
