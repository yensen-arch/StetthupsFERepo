import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function AboutUs() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-r from-pink-50 to-purple-50">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleBack}
          className="bg-purple-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>

      {/* About Us Section */}
      <section className="py-16 px-4 md:px-8 ">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            At <span className="font-semibold text-purple-800">StetthUps</span>,
            We are passionate about revolutionizing medical education. Our
            mission is to empower medical students worldwide with innovative
            audio-visual cases to excel in competitive exams such as NEET PG,
            USMLE, and PLAB. Driven by a team of experienced medical
            professionals and technology enthusiasts, we understand the
            challenges faced by aspiring doctors in preparing for these rigorous
            exams. That’s why we have created a comprehensive platform that
            combines cutting-edge technology with expertly curated content to
            provide an unparalleled learning experience. Our audio-visual cases
            are meticulously designed to simulate real-life scenarios, allowing
            students to hone their diagnostic and decision-making skills.
            Whether you’re studying for NEET PG in India, USMLE in the United
            States, or PLAB in the United Kingdom, StetthUps is your trusted
            partner in achieving success. Join thousands of medical students who
            have already benefited from our platform and embark on your journey
            towards a successful medical career with confidence. Let StetthUps
            be your guide to mastering the challenges of competitive exams and
            realizing your full potential as a healthcare professional.
          </p>
        </div>
      </section>

      {/* Policy Buttons */}
<div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 pb-10 justify-center items-center">
  <button
    onClick={() => (window.location.href = "/terms")}
    className="bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
  >
    Terms & Conditions
  </button>
  <button
    onClick={() => (window.location.href = "/privacy")}
    className="bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
  >
    Privacy Policy
  </button>
  <button
    onClick={() => (window.location.href = "/refund")}
    className="bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
  >
    Refunds & Returns
  </button>
</div>

    </div>
  );
}

export default AboutUs;
