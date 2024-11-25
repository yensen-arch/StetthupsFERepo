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

function Progress() {
  const [subjectData, setSubjectData] = useState<{ [key: number]: SubjectData[] }>({});
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

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
          setAllDataLoaded(true);
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

      setSubjectData(subjectDataMap);
    } catch (err) {
      console.error("Error fetching master data:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Progress</h2>
      {Object.entries(subjectData).map(([subscriptionId, subjects]) => (
        <div key={subscriptionId} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {subscriptionData.find((s) => s.id === parseInt(subscriptionId))?.subscription_name ||
              "Unknown Subscription"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.slice(0, 12).map((subject) => ( // Show 4 rows, assuming 3 cards per row
              <div key={subject.subject.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={subject.subject.image_path}
                    alt={subject.subject.subject_name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <h4 className="text-lg font-medium">{subject.subject.subject_name}</h4>
                </div>
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Progress;
