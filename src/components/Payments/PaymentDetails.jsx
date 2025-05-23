import React, { useState, useEffect } from 'react';
import { CheckCircle, Lock } from 'lucide-react';

// Pricing data structure (same as before)
import { pricingData } from './Plan';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';

export default function PaymentPage() {
  const BASE_URL = "https://apiwl.novajobs.us";
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Convert pricing data to plans object for easy lookup
  const plansObj = {
    freePlan: pricingData.freePlan,
    singlePass: pricingData.singlePass,
    aiProMonth: pricingData.aiProMonth,
    aiProYearly: pricingData.aiProYearly,
  };

  // Get features as array from object
  const getFeatures = (plan) => {
    if (!plan) return [];
    return Object.keys(plan)
      .filter(key => key.startsWith('feature'))
      .map(key => plan[key]);
  };

  // Format price based on billing cycle
  const formatPrice = (plan) => {
    if (!plan) return "";

    if (plan.price === "0") {
      return "Free";
    }

    if (plan.billingCycle === "single") {
      return `$${plan.price}`;
    } else if (plan.billingCycle === "month") {
      return `$${plan.price}/mo`;
    } else if (plan.billingCycle === "year") {
      return `$${plan.price}/yr`;
    }

    return `$${plan.price}`;
  };

  // Get renewal period text
  const getRenewalText = (plan) => {
    if (!plan) return "";

    if (plan.billingCycle === "single") {
      return "one-time payment";
    } else if (plan.billingCycle === "month") {
      return "every month";
    } else if (plan.billingCycle === "year") {
      return "every year";
    }

    return "";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planKey = params.get("selectedPlan");

    if (planKey && plansObj[planKey]) {
      setSelectedPlanId(planKey);
      setSelectedPlan(plansObj[planKey]);
    } else {
      // Default to aiProMonth plan
      setSelectedPlanId("aiProMonth");
      setSelectedPlan(plansObj.aiProMonth);
    }
  }, []);

  const handleCheckout = async () => {
    if (!selectedPlanId) {
      alert("Please select a plan before proceeding.");
      return;
    }
    
    // Demo functionality - replace with your actual API call
    // alert(`Proceeding with checkout for ${selectedPlan?.title || 'selected plan'}`);
    
    
    // Original API call code - uncomment and modify as needed:
    const token = localStorage.getItem(Constant.USER_TOKEN);
    if (!token) {
      alert("Authentication required. Please log in.");
      // navigate("/login2");
      return;
    }
    
    const planMapping = {
      freePlan: 1,
      singlePass: 2,
      aiProMonth: 3,
      aiProYearly: 4,
    };

    const planId = planMapping[selectedPlanId];

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/payment/checkout`,
        { plan_id: planId },
        { headers: { Authorization: token } }
      );

      if (response.status === 200 && response.data?.url) {
        alert("Payment successful! Redirecting...");
        window.location.href = response.data.url;
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert(error.response?.data?.message || "Error processing payment.");
    }
  
  };

  const isFreeplan = selectedPlan?.price === "0";

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
        <div className="p-8">
          {/* Order Review Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Review your order
            </h2>
            
            <p className="mb-4 text-base text-gray-600">
              <strong className="text-gray-900">Plan:</strong> {selectedPlan ? selectedPlan.title : ""}
            </p>
            
            {/* Features List */}
            <div className="my-6">
              {selectedPlan &&
                getFeatures(selectedPlan).map((feature, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <CheckCircle className="text-blue-600 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}

              {selectedPlan && selectedPlan.billingCycle !== "single" && selectedPlan.price !== "0" && (
                <div className="flex items-center mb-3">
                  <CheckCircle className="text-blue-600 mr-2 flex-shrink-0" size={18} />
                  <span className="text-gray-600">
                    Automatically renews {getRenewalText(selectedPlan)}.
                  </span>
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center font-medium text-gray-700">
              <span>Total due today</span>
              <span className="text-xl font-semibold text-gray-900">
                {selectedPlan ? formatPrice(selectedPlan) : ""}
              </span>
            </div>
          </div>

          {/* Terms and Conditions */}
          {!isFreeplan && (
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              By clicking <strong>"Start applying"</strong> below, you agree to our
              <a href="#" className="text-blue-600 hover:underline mx-1">
                Terms of Use
              </a>
              and
              <a href="#" className="text-blue-600 hover:underline mx-1">
                Privacy Policy
              </a>
              . You also understand that you will be billed
              <strong> {selectedPlan ? formatPrice(selectedPlan) : ""}</strong>
              {selectedPlan && selectedPlan.billingCycle !== "single" && (
                <>
                  , which will automatically renew {getRenewalText(selectedPlan)}
                </>
              )}
              .
              <strong> You can cancel at any time.</strong>
            </p>
          )}

          {isFreeplan && (
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              By clicking <strong>"Start with Free Plan"</strong> below, you agree to our
              <a href="#" className="text-blue-600 hover:underline mx-1">
                Terms of Use
              </a>
              and
              <a href="#" className="text-blue-600 hover:underline mx-1">
                Privacy Policy
              </a>
              . You can upgrade to a paid plan at any time.
            </p>
          )}

          {/* Action Button */}
          <button
            onClick={handleCheckout}
            className={`
              w-full font-semibold py-3 px-4 rounded-lg border-none cursor-pointer text-base
              transition-colors duration-200
              ${isFreeplan 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }
            `}
          >
            {isFreeplan ? "Start with Free Plan" : "Start applying"}
          </button>

          {/* Secure Checkout */}
          {!isFreeplan && (
            <div className="flex items-center justify-center mt-4 text-gray-600">
              <Lock className="text-blue-600 mr-2" size={20} />
              <span className="text-xs font-semibold">SECURE CHECKOUT</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}