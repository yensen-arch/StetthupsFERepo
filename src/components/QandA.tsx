import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

function QandA({ data, QAdone, setQAdone }) {
  const { quiz = [] } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.id;
  const accessToken = localStorage.getItem("access_token");
  const { caseId } = useParams();
  const currentQuiz = quiz[currentIndex] || {};
  const { question = "No question available", explanation = "" } = currentQuiz;

  useEffect(() => {
    if (!quiz.length) return;

    if (!QAdone) {
      const allAnswered = quiz.every((_, index) => selectedAnswers[index]);
      setQAdone(allAnswered);
      if (allAnswered) {
        const totalQuestions = quiz.length;
        const totalAttempted = Object.keys(selectedAnswers).length;
        const score = Object.values(selectedAnswers).filter(
          (answer) => answer.isCorrect
        ).length;

        const result = {
          case_id: caseId,
          is_completed: 1,
          score,
          total_attempted_questions: totalAttempted,
          total_questions: totalQuestions,
          user_id: userID,
        };

        fetch("https://admin.stetthups.com/api/v1/make/result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(result),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Failed to submit results");
          })
          .catch((error) => {
            console.error("Error submitting results:", error);
          });
      }
    }
  }, [selectedAnswers, quiz, setQAdone, caseId, userID, accessToken, QAdone]);

  useEffect(() => {
    if (QAdone) {
      localStorage.setItem(`capsuleAccess_${caseId}`, 'true');
    }
  }, [QAdone, caseId]);

  const handleCheckboxChange = (optionKey) => {
    if (QAdone) return; // Prevent changing answers if quiz is completed
    const isCorrect = optionKey === currentQuiz.correct_ans;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selected: optionKey,
        isCorrect,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (QAdone) {
      // Navigate to the Capsule tab
      const event = new CustomEvent("navigateToCapsule");
      window.dispatchEvent(event);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (!quiz.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg text-left"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No Quiz Available
        </h2>
        <p className="text-gray-700">
          Please check back later or contact support.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg"
    >
      <motion.h2
        key={currentIndex}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-gray-800 mb-6 text-left"
      >
        {question}
      </motion.h2>
      <ul className="space-y-4">
        <AnimatePresence mode="wait">
          {["a", "b", "c", "d"].map((key) => {
            const optionKey = `option_${key}`;
            const answerText = currentQuiz[optionKey];
            const selectedAnswer = selectedAnswers[currentIndex];
            const isSelected = selectedAnswer?.selected === key.toUpperCase();
            const isCorrect = key.toUpperCase() === currentQuiz.correct_ans;
            const isDisabled = QAdone || selectedAnswer;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.li
                  whileHover={!isDisabled ? { scale: 1.02 } : {}}
                  whileTap={!isDisabled ? { scale: 0.98 } : {}}
                  className={`flex items-center space-x-3 p-4 rounded-lg shadow-md transition-all duration-300 ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-100 border-2 border-green-400"
                        : "bg-red-100 border-2 border-red-400"
                      : isDisabled && isCorrect
                      ? "bg-green-100 border-2 border-green-400"
                      : "bg-white border border-gray-300 hover:border-purple-800"
                  } ${
                    isDisabled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    !isDisabled && handleCheckboxChange(key.toUpperCase())
                  }
                >
                  <span
                    className={`text-lg ${
                      isSelected || (isDisabled && isCorrect) ? "font-semibold" : ""
                    } text-left`}
                  >
                    {answerText || "No option available"}
                  </span>
                  {(isSelected || (isDisabled && isCorrect)) && (
                    <span className="ml-auto">
                      {isCorrect ? (
                        <Check className="w-6 h-6 text-green-600" />
                      ) : (
                        <X className="w-6 h-6 text-red-600" />
                      )}
                    </span>
                  )}
                </motion.li>
                <AnimatePresence>
                  {(selectedAnswer || QAdone) && isCorrect && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 p-4 bg-green-50 border border-green-200 rounded-lg shadow-inner"
                    >
                      <p className="text-gray-700 text-lg text-left">
                        {explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </ul>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-2 font-semibold text-white bg-purple-800 rounded-lg shadow-md hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={!selectedAnswers[currentIndex] && !QAdone}
          className="px-6 py-2 font-semibold text-white bg-purple-800 rounded-lg shadow-md hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
        >
          {currentIndex === quiz.length - 1 ? "Finish" : "Next"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>

      <AnimatePresence>
        {QAdone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-green-600 font-bold text-xl bg-green-100 p-4 rounded-lg shadow-inner">
              Congratulations! You have completed all the questions!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QandA;

