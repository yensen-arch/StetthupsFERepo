"use client";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressCircles from "./ProgressCircles.tsx";

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
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  const [selectedNames, setSelectedNames] = useState<{
    subjectName: string | null;
    topicName: string | null;
  }>({ subjectName: null, topicName: null });
  const navigate = useNavigate();
  const subjectRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  async function getIncompleteCasesAfter(subjectData, inputCaseId) {
    return new Promise((resolve, reject) => {
      try {
        const incompleteCases = [];
        let foundInputCase = false; // Tracks whether the input case ID has been found

        // Traverse the dataset
        Object.values(subjectData).forEach((subjectArray) => {
          subjectArray.forEach((subjectObj) => {
            const subjectName = subjectObj.subject.subject_name; // Extract subject name
            subjectObj.topics.forEach((topicObj) => {
              const topicName = topicObj.topic.topic_name; // Extract topic name
              topicObj.cases.forEach((caseItem) => {
                if (caseItem.id === inputCaseId) {
                  foundInputCase = true; // Mark when the input case ID is found
                } else if (foundInputCase && !caseItem.is_completed) {
                  // Collect incomplete cases only after the input case ID is found
                  incompleteCases.push({
                    caseId: caseItem.id,
                    topicName,
                    subjectName,
                  });
                }
              });
            });
          });
        });

        resolve(incompleteCases); // Return the list of incomplete cases with details
      } catch (error) {
        reject(error);
      }
    });
  }

  const handleCaseClick = async (caseId, subjectName, topicName) => {
    try {
      const incompleteCases = await getIncompleteCasesAfter(
        subjectData,
        caseId
      );
      navigate(`/user-study/${caseId}`, {
        state: {
          subjectName,
          topicName,
          incompleteCases,
        },
      });
    } catch (error) {
      console.error("Error handling case click:", error);
    }
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
        if (subscriptionResponse.status === 302) {
          navigate("/login");
        } else if (subscriptionData.success) {
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
        navigate("/login");
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
      const storedStudyData = localStorage.getItem("studyData");
      if (storedStudyData) {
        const { subscriptionId, subjectId } = JSON.parse(storedStudyData);
        handlePlanSelect(parseInt(subscriptionId));
        localStorage.removeItem("studyData");
      }
    } catch (err) {
      console.error("Error fetching master data:", err);
    }
  };

  const handlePlanSelect = (planId: number) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
    setExpandedSubject({});
    setExpandedTopic({});
    const studyData = localStorage.getItem("studyData");
    if (studyData) {
      const { subjectId } = JSON.parse(studyData);
      handleSubjectSelect(planId, parseInt(subjectId));
    }
  };
  const scrollToSubject = useCallback((subjectId: number) => {
    if (subjectRefs.current[subjectId]) {
      subjectRefs.current[subjectId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);
  const handleSubjectSelect = useCallback(
    (planId: number, subjectId: number) => {
      setExpandedSubject((prev) => ({
        ...prev,
        [planId]: prev[planId] === subjectId ? null : subjectId,
      }));
      setExpandedTopic((prev) => ({
        ...prev,
        [planId]: {},
      }));
      setTimeout(() => {
        scrollToSubject(subjectId);
      }, 700);
    },
    [scrollToSubject]
  );
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
  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6739B7]"></div>
      </div>
    );
  }
  return (
    <div className=" md:p-6 bg-gray-50 min-h-screen  ">
      {error && (
        <p className="text-red-500 mb-6 text-center rounded-lg bg-red-50 p-4">
          {error}
        </p>
      )}
      <div className=" mx-auto space-y-6 p-4 mb-12 sm:p-6 lg:p-8 flex justify-between">
        <div className="flex-1 w-[70%] max-w-5xl mx-auto space-y-6 sm:p-6 lg:p-8">
          <AnimatePresence>
            {subscriptionData?.map((plan) => (
              <Card key={plan.id} className="bg-white overflow-hidden">
                <CardContent className="">
                  <div className="w-full h-auto p-4 md:p-6 flex items-center justify-between bg-white hover:bg-gray-50">
                    <Button
                      className="flex-grow text-left"
                      onClick={() => {
                        if (
                          subjectData[plan.id] &&
                          subjectData[plan.id].length > 0
                        ) {
                          handlePlanSelect(plan.id);
                        }
                      }}
                      disabled={
                        !subjectData[plan.id] ||
                        subjectData[plan.id].length === 0
                      }
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
                          onClick={() => window.location.href='/buysubs'}                          >
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
                        transition={{ duration: 0.6 }}
                        className="overflow-hidden"
                      >
                        {subjectData[plan.id] ? (
                          <div className="divide-y divide-gray-100">
                            {subjectData[plan.id].map((item) => (
                              <div
                                key={item.subject.id}
                                ref={(el) =>
                                  (subjectRefs.current[item.subject.id] = el)
                                }
                                className="py-4 px-2 hover:bg-gray-50 transition-colors duration-200"
                              >
                                <Button
                                  className="w-full text-left"
                                  onClick={() =>
                                    handleSubjectSelect(
                                      plan.id,
                                      item.subject.id
                                    )
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
                                      <div
                                        className="flex justify-between items-center mb-2"
                                        onClick={() => {
                                          setSelectedNames((prev) => {
                                            const updatedState = {
                                              ...prev,
                                              subjectName:
                                                item.subject.subject_name,
                                            };
                                            return updatedState;
                                          });
                                        }}
                                      >
                                        <span className="font-semibold text-gray-900 ">
                                          {item.subject.subject_name}
                                        </span>
                                        <div className="hidden md:flex items-center gap-2">
                                          <span className="text-sm text-gray-600">
                                            {item.completed_topics}/
                                            {item.total_topics} Systems
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
                                      <div className="mt-4  space-y-4">
                                        {item.topics.map((topicData) => (
                                          <div
                                            key={topicData.topic.id}
                                            className="bg-white rounded-lg border border-gray-200 p-4"
                                          >
                                            <Button
                                              className="w-full text-left"
                                              onClick={() => {
                                                handleTopicSelect(
                                                  plan.id,
                                                  item.subject.id,
                                                  topicData.topic.id
                                                );
                                                setSelectedNames((prev) => ({
                                                  ...prev,
                                                  topicName:
                                                    topicData.topic.topic_name,
                                                }));
                                              }}
                                            >
                                              <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-900">
                                                  {topicData.topic.topic_name}
                                                </span>
                                                <div className="hidden md:flex items-center gap-2">
                                                  <span className="text-sm text-gray-600">
                                                    {topicData.completed_cases}/
                                                    {topicData.total_cases}{" "}
                                                    Cases
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
                                                  exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                  }}
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
                                                              caseItem.id,
                                                              item.subject
                                                                .subject_name,
                                                              topicData.topic
                                                                .topic_name
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
                                                              {
                                                                caseItem.case_name
                                                              }
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
        <div className="hidden xl:block">
          <div className="space-y-4">
            <ProgressCircles />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyComponent;
