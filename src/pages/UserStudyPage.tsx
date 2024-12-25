import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.tsx";
import VideoPlayer from "../components/VideoPlayer.tsx";
import { useParams, useNavigate } from "react-router-dom";
import Description from "../components/Description.tsx";
import QandA from "../components/QandA.tsx";
import Capsule from "../components/Capsule.tsx";
import { useLocation } from "react-router-dom";

function StudyPage() {
  const [activeButton, setActiveButton] = useState("Description");
  const [sidebarActive, setSidebarActive] = useState("Study");
  const [videoUrl, setVideoUrl] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [qaData, setQaData] = useState(null);
  const [incompleteCases, setIncompleteCases] = useState([]);
  const [currentSubjectName, setCurrentSubjectName] = useState("");
  const [currentTopicName, setCurrentTopicName] = useState("");
  const { caseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [QAdone, setQAdone] = useState(false);
  const {
    subjectName,
    topicName,
    incompleteCases: initialIncompleteCases,
  } = location.state || {};

  useEffect(() => {
    setIncompleteCases(initialIncompleteCases || []);
    setCurrentSubjectName(subjectName);
    setCurrentTopicName(topicName);
  }, [initialIncompleteCases, subjectName, topicName]);

  useEffect(() => {
    const handleNavigation = () => setActiveButton("Capsule");
    window.addEventListener("navigateToCapsule", handleNavigation);
    return () => {
      window.removeEventListener("navigateToCapsule", handleNavigation);
    };
  }, []);

  useEffect(() => {
    const fetchCaseData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken || !caseId) {
        console.error("Missing access_token or caseId.");
        return;
      }
      setActiveButton("Description");
      try {
        const response = await fetch(
          `https://admin.stetthups.com/api/v1/get/case/${caseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setCaseData(result.data);
          setVideoUrl(result.data.case_files);
        } else {
          console.error("Error fetching case data:", result.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    const checkCaseCompletion = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken || !caseId) {
        console.error("Missing access_token or caseId.");
        return;
      }

      try {
        const response = await fetch(
          `https://admin.stetthups.com/api/v1/get/result/${caseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setQAdone(data.data[0]?.is_completed); // Set QAdone state based on result
      } catch (error) {
        console.log(error);
      }
    };
    checkCaseCompletion();

    const fetchQaData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken || !caseId) {
        console.error("Missing access_token or caseId.");
        return;
      }

      try {
        const response = await fetch(
          `https://admin.stetthups.com/api/v1/get/quiz/case/${caseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setQaData(result.data);
        } else {
          console.error("Error fetching QA data:", result.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchCaseData();
    fetchQaData();
  }, [caseId]);

  const handleNextCase = () => {
    if (incompleteCases.length === 0) {
      console.log("No more incomplete cases.");
      return;
    }

    const nextCase = incompleteCases[0];
    const updatedIncompleteCases = incompleteCases.slice(1);

    setIncompleteCases(updatedIncompleteCases);
    setCurrentSubjectName(nextCase.subjectName);
    setCurrentTopicName(nextCase.topicName);

    const fetchCaseData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken || !nextCase.caseId) {
        console.error("Missing access_token or caseId.");
        return;
      }

      try {
        const response = await fetch(
          `https://admin.stetthups.com/api/v1/get/case/${nextCase.caseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setCaseData(result.data);
          setVideoUrl(result.data.case_files);
          setActiveButton("Description"); // Set active button to Description
          setQAdone(false); // Reset QAdone state
          window.scrollTo(0, 0); 
        } else {
          console.error("Error fetching case data:", result.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    const fetchQaData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken || !nextCase.caseId) {
        console.error("Missing access_token or caseId.");
        return;
      }

      try {
        const response = await fetch(
          `https://admin.stetthups.com/api/v1/get/quiz/case/${nextCase.caseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setQaData(result.data);
        } else {
          console.error("Error fetching QA data:", result.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchCaseData();
    fetchQaData();
  };

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="z-50">
        {" "}
        {isDesktop || activeButton === "Capsule" ? (
          <Sidebar
            activeButton={sidebarActive}
            setActiveButton={setSidebarActive}
          />
        ) : null}
      </div>

      <main className="flex-grow p-6">
        {caseData && (
          <h2 className="text-xl font-semibold text-left text-gray-800 mb-4">
            {caseData.case_name} - {currentTopicName} - {currentSubjectName}
          </h2>
        )}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md m-0 mb-6">
            {videoUrl ? (
              <VideoPlayer videoUrl={videoUrl} />
            ) : (
              <p className="text-gray-500 text-center py-8">Loading video...</p>
            )}
          </div>

          <div className="mb-6">
            <nav className="flex space-x-4">
              {["Description", "Q&A", "Capsule"].map((button) => (
                <button
                  key={button}
                  onClick={() => setActiveButton(button)}
                  disabled={button === "Capsule" && !QAdone}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    activeButton === button
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-purple-100"
                  } ${
                    button === "Capsule" && !QAdone
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                  }`}
                >
                  {button}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-lg shadow-md transition-all duration-400">
            {activeButton === "Description" && caseData && (
              <Description
                description={caseData.case_description}
                setActiveButton={setActiveButton}
              />
            )}
            {activeButton === "Q&A" && qaData && (
              <QandA data={qaData} QAdone={QAdone} setQAdone={setQAdone} />
            )}
            {activeButton === "Capsule" && caseData && QAdone && (
              <Capsule
                analysis={caseData.case_analysis}
                file={caseData.case_analysis_files}
                nextCase={handleNextCase}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudyPage;
