import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function AboutUs() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
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
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            At <span className="font-semibold text-purple-800">StetthUps</span>,
            we are passionate about revolutionizing medical education. Founded
            by a team of dedicated professionals with expertise in medical
            training, our mission is to empower students and professionals
            worldwide with innovative learning tools and resources. With a
            commitment to excellence and a deep understanding of the challenges
            faced in medical education, we strive to provide comprehensive
            solutions that enhance learning outcomes and support the next
            generation of healthcare professionals.
          </p>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-left">
            Terms & Conditions
          </h2>
          <div className="space-y-6 text-black text-left">
            <p className="text-lg ">
              By using our platform, you agree to the following terms and
              conditions:
            </p>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li>
                All purchases made on our platform are subject to availability
                and confirmation of the order.
              </li>
              <li>
                Payments are processed securely through PhonePe Payment Gateway.
                By completing a purchase, you agree to the terms of the payment
                gateway.
              </li>
              <li>
                We reserve the right to cancel any order at any time due to
                unforeseen circumstances.
              </li>
              <li>
                Refunds will be processed within 7-10 business days, subject to
                our refund policy.
              </li>
              <li>
                You are responsible for providing accurate information during
                the checkout process. Incorrect details may result in delays or
                cancellation of your order.
              </li>
              <li>
                By using our platform, you agree to comply with all applicable
                laws and regulations.
              </li>
            </ul>
            <p className="text-lg">
              For any questions or concerns regarding our terms and conditions,
              please contact us at{" "}
              <a
                href="mailto:support@stetthups.com"
                className="text-purple-800 underline"
              >
                support@stetthups.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
