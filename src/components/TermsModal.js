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
    title: "Join Cybex IT Group to Kick Start Your Lesson",
    description: "Join and Learn from our Top Instructors!",
    image: Img4,
  },
];

export default function Component() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenFeaturesModal");
    if (hasSeenModal) {
      setIsVisible(false);
    }
  }, []);

  const hideModal = () => {
    setIsVisible(false); // Hide the modal when the "Close" button is clicked
    localStorage.setItem("hasSeenFeaturesModal", "true"); // Optionally, save the state in local storage to avoid showing it again
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white min-h-screen shadow-xl w-full max-w-md overflow-hidden ">
        <div className="relative mt-6">
          {currentIndex < features.length - 1 && (
            <button
              onClick={hideModal}
              className="absolute top-4 right-4 text-black rounded-full px-3 bg-slate-300 z-10"
            >
              SKIP
            </button>
          )}
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 200, damping: 50 }}
              className="max-h-[0px] px-4"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-92 h-92 flex justify-center items-center mt-20 overflow-hidden">
                  <img
                    src={features[currentIndex].image}
                    alt={features[currentIndex].title}
                    className="object-contain h-80 w-80 mb-6"
                  />
                </div>
                <div className="text-center h-[130px] flex flex-col justify-center ">
                  <h2 className="text-xl font-bold my-2">
                    {features[currentIndex].title}
                  </h2>
                  <p className="text-black text-sm mb-2">
                    {features[currentIndex].description}
                  </p>
                </div>
              </div>

              {/* Conditionally render paginator and buttons */}
              {currentIndex < features.length - 1 ? (
                <div>
                  <div className="flex justify-center space-x-1 mb-4">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentIndex
                            ? "bg-purple-800"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextSlide}
                    className="w-44 font-bold bg-purple-800 text-white py-3 rounded-lg active:bg-purple-900 transition duration-300"
                  >
                    CONTINUE
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <button
                    onClick={hideModal}
                    className="w-40 font-bold  bg-purple-800 text-white py-3 rounded-lg hover:bg-pupple-900 transition duration-300"
                  >
                    CLOSE
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
