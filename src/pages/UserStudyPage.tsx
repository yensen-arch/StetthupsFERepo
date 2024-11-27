import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.tsx";
import VideoPlayer from "../components/VideoPlayer.tsx";
import { useParams } from "react-router-dom";
import Description from "../components/Description.tsx";
import QandA from "../components/QandA.tsx";
import Capsule from "../components/Capsule.tsx";

function StudyPage() {
  const [activeButton, setActiveButton] = useState("Description");
  const [videoUrl, setVideoUrl] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [qaData, setQaData] = useState(null);
  const { caseId } = useParams();
  const [QAdone, setQAdone] = useState(false);

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Sidebar activeButton={activeButton} setActiveButton={setActiveButton} /> */}
      <main className="flex-grow p-8">
        {caseData && (
          <h2 className="text-xl font-semibold text-left text-gray-800 mb-4">
            {caseData.case_name}
          </h2>
        )}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-purple-800">
            Study Materials
          </h1>
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

          <div>
            {activeButton === "Description" && caseData && (
              <Description description={caseData.case_description} />
            )}
            {activeButton === "Q&A" && qaData && (
              <QandA data={qaData} QAdone={QAdone} setQAdone={setQAdone} />
            )}
            {activeButton === "Capsule" && caseData && (
              <Capsule
                analysis={caseData.case_analysis}
                file={caseData.case_analysis_files}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudyPage;
