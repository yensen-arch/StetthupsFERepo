import React, { useState, useEffect } from "react";

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
  const [subjectData, setSubjectData] = useState<{
    [key: number]: SubjectData[];
  }>({});
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionPlan[]>([]);
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
          const userSubscriptions = subscriptionData.data.filter(
            (sub: SubscriptionPlan) => sub.price === 0 || sub.is_purchased
          );
          setSubscriptionData(userSubscriptions);

          const subscriptionIds = userSubscriptions.map(
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
          subjectDataMap[subscriptionIds[index]] = response.data.filter(
            (subject: SubjectData) => subject.completed_topics > 0
          );
        }
      });

      setSubjectData(subjectDataMap);
    } catch (err) {
      console.error("Error fetching master data:", err);
    }
  };

  const CircleProgress = ({ percentage, color }: { percentage: number; color: string }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-20 h-20">
        <svg className="transform -rotate-90 w-20 h-20">
          <circle
            className="text-gray-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
          />
          <circle
            className={`${color} transition-all duration-1000 ease-out`}
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="40"
            cy="40"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{percentage}%</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-purple-700">Progress Report</h2>
      {Object.entries(subjectData).map(([subscriptionId, subjects]) => (
        subjects.length > 0 && (
          <div key={subscriptionId} className="mb-8">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[39px] top-0 bottom-0 w-1 bg-blue-500" />
              
              {/* Subject circles */}
              <div className="space-y-8">
                {subjects.map((subject, index) => {
                  const percentage = Math.round(
                    (subject.completed_topics / subject.total_topics) * 100
                  );
                  const colors = [
                    "text-blue-500",
                    "text-green-500",
                    "text-purple-500",
                    "text-pink-500",
                  ];
                  
                  return (
                    <div
                      key={subject.subject.id}
                      className="relative flex items-start gap-6 group"
                    >
                      <CircleProgress
                        percentage={percentage}
                        color={colors[index % colors.length]}
                      />
                      <div className="pt-2">
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {subject.subject.subject_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {subject.completed_topics} of {subject.total_topics} completed
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default ProgressCircles;

