import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-hot-toast";

const plans = {
  free: {
    name: "Free Plan",
    price: "Free",
    priceValue: 0,
    plan_id: 1,
    features: [
      "Unlimited Resume Edits",
      "Download in PDF",
      "Interactive Dashboard",
      "2 Unique Resume Templates",
      "2 Color Options & 2 Fonts",
      "Resume Parsing (ATS-Friendly)",
      "French Language Support",
      "Job Search & Career Resources",
      "Cover Letter Builder",
      "Job Alerts & Tracking",
    ],
  },
  singlePass: {
    name: "Single Pass",
    price: "£49",
    priceValue: 49,
    plan_id: 2,
    features: [
      "Everything in Free +",
      "27 Unique Resume Templates",
      "5 Color Options & 6 Fonts",
      "Resume Parsing (ATS-Friendly)",
      "Free Cover Letter Builder",
      "AI Resume Score & Feedback",
      "Skill Tests & Analysis",
      "AI-Enabled Content",
      "Auto-Improvement",
      "ATS Optimization",
    ],
  },
  aiProMonth: {
    name: "AI Pro Month",
    price: "£199/mo",
    priceValue: 199,
    plan_id: 3,
    features: [
      "Everything in Free +",
      "37 Unique Resume Templates",
      "8 Color Options & 6 Fonts",
      "Resume Parsing (ATS-Friendly)",
      "Free Cover Letter Builder",
      "AI Resume Score & Feedback",
      "Skill Tests & Analysis",
      "AI-Enabled Content",
      "Auto-Improvement",
      "ATS Optimization",
    ],
  },
  aiProYearly: {
    name: "AI Pro Yearly",
    price: "£499/yr",
    priceValue: 499,
    plan_id: 4,
    features: [
      "Everything in Free +",
      "37 Unique Resume Templates",
      "8 Color Options & 6 Fonts",
      "Resume Parsing (ATS-Friendly)",
      "Free Cover Letter Builder",
      "AI Resume Score & Feedback",
      "Skill Tests & Analysis",
      "AI-Enabled Content",
      "Auto-Improvement",
      "ATS Optimization",
    ],
  },
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CheckoutPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const planKey = query.get("plan") || "free";
  const plan = plans[planKey] || plans["free"];
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (plan.plan_id === 1) { // Free plan
      toast.error("Cannot checkout with free plan");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/payment/checkout",
        {
          plan_id: plan.plan_id
        },
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        // Handle successful checkout
        // You might want to redirect to a success page or handle the response data
        toast.success("Checkout successful!");
        // navigate('/success-page'); // Uncomment and add your success page route
      } else {
        toast.error(response.data.message || "Checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to process checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mt-8">
        <button className="text-sm text-gray-500 mb-6 hover:underline" onClick={() => navigate(-1)}>&lt; Back to plans</button>
        <h2 className="text-xl font-bold mb-4">Review your order</h2>
        <div className="mb-4">
          <span className="font-semibold">Plan:</span> <span className="text-gray-700">{plan.name}</span>
        </div>
        <ul className="mb-6 space-y-2">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-700">
              <span className="text-orange-500 mr-2">✔</span> {feature}
            </li>
          ))}
        </ul>
        <div className="my-6">
          <div className="bg-orange-600 text-white text-center rounded-lg py-5 text-lg font-semibold mb-4">
            Total due today<br />
            <span className="text-2xl font-bold">{plan.price}</span>
          </div>
          <button 
            className={`w-full bg-[#0a2946] text-white py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <span className="material-icons">lock</span> Proceed to Secure Checkout
              </>
            )}
          </button>
        </div>
        <div className="text-xs text-gray-600 mt-4">
          <span className="font-semibold">Money-back guarantee:</span> 14-day satisfaction guarantee. If you are not satisfied, contact us for a full refund.
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 