import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/buysubs");
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 flex flex-col items-center justify-center p-4">
      {/* Payment Failure Content */}
      <div className="bg-gradient-to-r from-purple-100 transition-all duration-300 ease-in-out to-pink-100 p-8 rounded-lg shadow-lg hover:shadow-2xl text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">
          Payment Failed
        </h1>
        <p className="text-pink-700 mb-6">
          Oops! There was an issue processing your payment. Please try
          again or contact support if the problem persists.
        </p>
        <button
          onClick={handleBack}
          className="bg-purple-800 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default PaymentFailure;
