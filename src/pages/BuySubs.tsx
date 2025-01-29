import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function BuySubs() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscription plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch(
          "https://admin.stetthups.com/api/v1/get/subscription/plan",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subscription plans");
        }

        const data = await response.json();
        if (data.success) {
          setPlans(data.data.slice(1));
        } else {
          throw new Error(data.message || "Failed to fetch subscription plans");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Handle buy button click
  const handleBuy = async (planId: number) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // Make a request to your backend to get the payment URL
      const response = await fetch(
        "https://your-backend.com/api/phonepe/initiate-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      const data = await response.json();
      if (data.success) {
        // Redirect user to the PhonePe payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.message || "Payment initiation failed");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-800">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

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

      {/* Subscription Plans Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-8 text-center">
            Our Subscription Plans
          </h1>
          <div className="space-y-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white text-left p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-bold text-purple-800 mb-2">
                  {plan.subscription_name}
                </h2>
                <p className="text-green-700  mb-4">
                  <span className="font-semibold">Price:</span> ₹
                  {plan.web_price} |{" "}
                  <span className="font-semibold">Duration:</span>{" "}
                  {plan.duration} months
                </p>
                <div
                  className="text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{ __html: plan.description }}
                />
                <button
                  onClick={() => handleBuy(plan.id)}
                  className="bg-purple-800 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuySubs;
