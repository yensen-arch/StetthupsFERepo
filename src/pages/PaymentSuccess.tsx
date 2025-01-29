import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-purple-700">Payment Successful!</h1>
        <p className="text-gray-600 mt-3">Your payment has been processed successfully.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
