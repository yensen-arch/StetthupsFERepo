import { useEffect, useState } from "react";
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

interface UserSubscription {
  id: number;
  subscription_id: number;
  price: number;
  user_id: number;
  start_date: string;
  end_date: string;
  payment_method: string;
  transaction_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  subscription_cases: Array<{
    id: number;
    subscription_id: number;
    case_id: number;
    status: number;
    created_at: string;
    updated_at: string;
  }>;
}

function BuySubs() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<
    UserSubscription[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscription plans and user subscriptions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        // Fetch subscription plans
        const plansResponse = await fetch(
          "https://admin.stetthups.com/api/v1/get/subscription/plan",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!plansResponse.ok) {
          throw new Error("Failed to fetch subscription plans");
        }

        const plansData = await plansResponse.json();
        if (!plansData.success) {
          throw new Error(
            plansData.message || "Failed to fetch subscription plans"
          );
        }

        // Fetch user subscriptions
        const userSubscriptionsResponse = await fetch(
          "https://admin.stetthups.com/api/v1/get/subscription/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!userSubscriptionsResponse.ok) {
          throw new Error("Failed to fetch user subscriptions");
        }

        const userSubscriptionsData = await userSubscriptionsResponse.json();
        if (!userSubscriptionsData.success) {
          throw new Error(
            userSubscriptionsData.message ||
              "Failed to fetch user subscriptions"
          );
        }

        setPlans(plansData.data);
        setUserSubscriptions(userSubscriptionsData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle back button click
  const handleBack = () => {
    navigate("/ ");
  };

  // Handle buy button click
  const handleBuy = async (plan: SubscriptionPlan) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/login");
      }

      const formData = new FormData();
      formData.append("amount", plan.web_price.toString());
      formData.append("subscription_id", plan.id.toString());

      const response = await fetch(
        "https://admin.stetthups.com/api/v1/pay/with/phonepe",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log(data.data.instrumentResponse.redirectInfo.url);
        window.open(data.data.instrumentResponse.redirectInfo.url, "_blank");
      } else {
        throw new Error(data.message || "Payment initiation failed");
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Payment initiation failed"
      );
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
            {plans.map((plan) => {
              const userSubscription = userSubscriptions.find(
                (sub) => sub.subscription_id === plan.id
              );
              return (
                <div
                  key={plan.id}
                  className="bg-white text-left p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-purple-800 mb-2">
                    {plan.subscription_name}
                  </h2>
                  <p className="text-green-700 mb-4">
                    <span className="font-semibold">Price:</span> ₹
                    {plan.web_price} |{" "}
                    <span className="font-semibold">Duration:</span>{" "}
                    {plan.duration} months
                  </p>
                  <div
                    className="text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{ __html: plan.description }}
                  />
                  {userSubscription ? (
                    <p className="text-purple-800 font-semibold">
                      Expires on:{" "}
                      {new Date(userSubscription.end_date).toLocaleDateString()}
                    </p>
                  ) : (
                    <button
                      onClick={() => handleBuy(plan)}
                      className="bg-purple-800 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuySubs;
