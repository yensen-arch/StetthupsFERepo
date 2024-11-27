"use client";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Events from "./events.tsx";

interface Case {
  id: number;
  case_name: string;
  case_files: string;
  case_analysis: string;
  case_analysis_files: string;
  is_completed: boolean;
  topic_id: number;
  created_at: string;
  updated_at: string;
  status: number;
}

interface Topic {
  id: number;
  topic_name: string;
  subject_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface TopicData {
  topic: Topic;
  total_cases: number;
  completed_cases: number;
  is_completed: boolean;
  cases: Case[];
}

interface Subject {
  id: number;
  subject_name: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  status: number;
}

interface SubjectData {
  subject: Subject;
  total_topics: number;
  completed_topics: number;
  is_completed: boolean;
  topics: TopicData[];
}

interface SubscriptionPlan {
  id: number;
  subscription_name: string;
  price: number;
  web_price: number;
  lifeline: number;
  duration: number;
  slug: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}
const Button = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ease-in-out ${className}`}
  >
    {children}
  </motion.button>
);

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <div className={`transition-all duration-300 ease-in-out ${className}`}>
    {children}
  </div>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <motion.svg
    animate={{ rotate: expanded ? 90 : 0 }}
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </motion.svg>
);

function StudyComponent() {
  const navigate = useNavigate();
  const handleCaseClick = (caseId: number) => {
    navigate(`/user-study/${caseId}`);
  };
  const [subscriptionData, setSubscriptionData] = useState<
    SubscriptionPlan[] | null
  >(null);
  const [subjectData, setSubjectData] = useState<{
    [key: number]: SubjectData[];
  }>({});
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<{
    [key: number]: number | null;
  }>({});
  const [expandedTopic, setExpandedTopic] = useState<{
    [key: number]: { [key: number]: number | null };
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);

          const subscriptionIds = subscriptionData.data.map(
            (item: SubscriptionPlan) => item.id
          );
          await fetchMasterData(token, subscriptionIds);
          setAllDataLoaded(true);
        } else {
          setError("Failed to fetch valid subscription data");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error:", err);
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

  const handlePlanSelect = (planId: number) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
    setExpandedSubject({});
    setExpandedTopic({});

    if (!subjectData[planId]) {
      const token = localStorage.getItem("access_token");
      if (token) {
        fetchMasterData(token, [planId]);
      }
    }
  };

  const handleSubjectSelect = (planId: number, subjectId: number) => {
    setExpandedSubject((prev) => ({
      ...prev,
      [planId]: prev[planId] === subjectId ? null : subjectId,
    }));
    setExpandedTopic((prev) => ({
      ...prev,
      [planId]: {},
    }));
  };

  const handleTopicSelect = (
    planId: number,
    subjectId: number,
    topicId: number
  ) => {
    setExpandedTopic((prev) => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        [subjectId]: prev[planId]?.[subjectId] === topicId ? null : topicId,
      },
    }));
  };

  const handleBuyPlan = (planId: number) => {
    // Implement buy plan functionality
    console.log(`Buying plan ${planId}`);
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6739B7]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen ">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 text-center">
        Study Page
      </h1>
      {error && (
        <p className="text-red-500 mb-6 text-center rounded-lg bg-red-50 p-4">
          {error}
        </p>
      )}
      <div className="w-screen max-w-5xl mx-auto space-y-6">
        <AnimatePresence>
          {subscriptionData?.map((plan) => (
            <Card key={plan.id} className="bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-auto p-4 md:p-6 flex items-center justify-between bg-white hover:bg-gray-50">
                  <Button
                    className="flex-grow text-left"
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg md:text-xl text-gray-900 mb-2">
                        {plan.subscription_name}
                      </h3>
                      <div className="text-sm text-gray-600 space-x-4">
                        <span className="inline-flex items-center">
                          <span className="mr-2">⏱️</span>
                          {plan.duration} months
                        </span>
                        <span className="inline-flex items-center">
                          <span className="mr-2">💫</span>
                          {plan.lifeline} lifelines
                        </span>
                      </div>
                    </div>
                  </Button>
                  {allDataLoaded &&
                    (!subjectData[plan.id] ||
                      subjectData[plan.id].length === 0) && (
                      <Button
                        className="bg-[#6739B7] text-white hover:bg-[#5a32a3] ml-4"
                        onClick={() => handleBuyPlan(plan.id)}
                      >
                        Buy
                      </Button>
                    )}
                  <ChevronIcon expanded={expandedPlan === plan.id} />
                </div>
                <AnimatePresence>
                  {expandedPlan === plan.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {subjectData[plan.id] ? (
                        <div className="divide-y divide-gray-100">
                          {subjectData[plan.id].map((item) => (
                            <div
                              key={item.subject.id}
                              className="p-4 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <Button
                                className="w-full text-left"
                                onClick={() =>
                                  handleSubjectSelect(plan.id, item.subject.id)
                                }
                              >
                                <div className="flex items-center gap-4">
                                  {item.subject.image_path && (
                                    <img
                                      src={item.subject.image_path}
                                      alt={item.subject.subject_name}
                                      className="w-12 h-12 rounded-lg object-cover"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="font-semibold text-gray-900">
                                        {item.subject.subject_name}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">
                                          {item.completed_topics}/
                                          {item.total_topics} topics
                                        </span>
                                        <ChevronIcon
                                          expanded={
                                            expandedSubject[plan.id] ===
                                            item.subject.id
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-[#6739B7]"
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${
                                            (item.completed_topics /
                                              item.total_topics) *
                                              100 || 0
                                          }%`,
                                        }}
                                        transition={{ duration: 0.5 }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Button>
                              <AnimatePresence>
                                {expandedSubject[plan.id] ===
                                  item.subject.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-4 pl-16 space-y-4">
                                      {item.topics.map((topicData) => (
                                        <div
                                          key={topicData.topic.id}
                                          className="bg-white rounded-lg border border-gray-200 p-4"
                                        >
                                          <Button
                                            className="w-full text-left"
                                            onClick={() =>
                                              handleTopicSelect(
                                                plan.id,
                                                item.subject.id,
                                                topicData.topic.id
                                              )
                                            }
                                          >
                                            <div className="flex justify-between items-center">
                                              <span className="font-medium text-gray-900">
                                                {topicData.topic.topic_name}
                                              </span>
                                              <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600">
                                                  {topicData.completed_cases}/
                                                  {topicData.total_cases} cases
                                                </span>
                                                <ChevronIcon
                                                  expanded={
                                                    expandedTopic[plan.id]?.[
                                                      item.subject.id
                                                    ] === topicData.topic.id
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                                              <motion.div
                                                className="h-full bg-green-500"
                                                initial={{ width: 0 }}
                                                animate={{
                                                  width: `${
                                                    (topicData.completed_cases /
                                                      topicData.total_cases) *
                                                      100 || 0
                                                  }%`,
                                                }}
                                                transition={{ duration: 0.5 }}
                                              />
                                            </div>
                                          </Button>
                                          <AnimatePresence>
                                            {expandedTopic[plan.id]?.[
                                              item.subject.id
                                            ] === topicData.topic.id && (
                                              <motion.div
                                                initial={{
                                                  height: 0,
                                                  opacity: 0,
                                                }}
                                                animate={{
                                                  height: "auto",
                                                  opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                              >
                                                <div className="mt-4 space-y-2 pl-4">
                                                  {topicData.cases.map(
                                                    (caseItem) => (
                                                      <motion.div
                                                        key={caseItem.id}
                                                        whileHover={{
                                                          scale: 1.02,
                                                        }}
                                                        whileTap={{
                                                          scale: 0.98,
                                                        }}
                                                        onClick={() =>
                                                          handleCaseClick(
                                                            caseItem.id
                                                          )
                                                        }
                                                        className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                                                          caseItem.is_completed
                                                            ? "bg-green-50 border border-green-100"
                                                            : "bg-gray-50 border border-gray-100"
                                                        }`}
                                                      >
                                                        <div className="flex justify-between items-center ">
                                                          <span className="font-medium ">
                                                            {caseItem.case_name}
                                                          </span>
                                                          {caseItem.is_completed && (
                                                            <span className="text-green-600 text-sm font-medium">
                                                              ✓ Completed
                                                            </span>
                                                          )}
                                                        </div>
                                                      </motion.div>
                                                    )
                                                  )}
                                                </div>
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#6739B7] mx-auto mb-4"></div>
                          Loading subject data...
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default StudyComponent;
