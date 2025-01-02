import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Img1 from "../assets/img1.jpg";
import Img2 from "../assets/img2.jpg";
import Img3 from "../assets/img3.jpg";
import Img4 from "../assets/img4.jpg";

const features = [
  {
    title: "Revolutionising Medical Education with Smart Learning Solutions",
    description:
      "A new era of medical learning with our innovative graphical representations and clinical integrations. STETTHUPs makes complex concepts simple and engaging for all medical students",
    image: Img1,
  },
  {
    title: "Empowering Future Doctors with Virtual Clinical Experience",
    description:
      "Gain hands-on clinical skills from anywhere with our diverse range of virtual cases. STETTHUPs bridges the gap between theoretical knowledge and real-world practice.",
    image: Img3,
  },
  {
    title: "Learn, Practice, Succeed: Your Pathway to Medical Excellence",
    description:
      "Master medical concepts and ace your exams with our comprehensive study tools and interactive learning modules. STETTHUPs equips you with the knowledge and confidence to excel in your medical career.",
    image: Img2,
  },
  {
    title: "Stetthups, your path to success",
    description: "Kickstart your Learning Now!",
    image: Img4,
  },
];

export default function FeatureModal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenFeaturesModal");
    if (hasSeenModal) {
      setIsAnimating(false);
    }
  }, []);

  useEffect(() => {
    if (currentIndex < features.length - 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [currentIndex]);

  const hideModal = () => {
    localStorage.setItem("hasSeenFeaturesModal", "true");
    setIsAnimating(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") {
              setIsAnimating(false); // Remove modal from DOM after exit animation
            }
          }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
            <div className="relative p-4 sm:p-6 md:p-8">
              {currentIndex < features.length - 1 && (
                <button
                  onClick={hideModal}
                  className="absolute top-4 right-4 text-black rounded-full px-3 py-1 bg-slate-300 z-10 text-sm sm:text-base transition-colors duration-300 hover:bg-slate-400"
                >
                  SKIP
                </button>
              )}
              <div className="h-[calc(100vh-8rem)] max-h-[36rem] overflow-hidden relative">
                <AnimatePresence initial={false} custom={currentIndex}>
                  <motion.div
                    key={currentIndex}
                    custom={currentIndex}
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex flex-col md:flex-row items-center"
                  >
                    <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full flex justify-center items-center p-4">
                      <img
                        src={features[currentIndex].image}
                        alt={features[currentIndex].title}
                        className="object-contain h-full w-full "
                      />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left h-auto md:h-full flex flex-col justify-center p-4 md:p-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-purple-800">
                        {features[currentIndex].title}
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6">
                        {features[currentIndex].description}
                      </p>
                      {currentIndex < features.length - 1 ? (
                        <button
                          onClick={nextSlide}
                          className="w-full md:w-auto px-6 py-3 font-bold bg-purple-800 text-white rounded-lg transition-colors duration-300 hover:bg-purple-900 text-sm sm:text-base"
                        >
                          CONTINUE
                        </button>
                      ) : (
                        <button
                          onClick={hideModal}
                          className="w-full md:w-auto px-6 py-3 font-bold bg-purple-800 text-white rounded-lg transition-colors duration-300 hover:bg-purple-900 text-sm sm:text-base"
                        >
                          CLOSE
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 flex justify-center space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? "bg-purple-800" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
