import React, { useState } from "react";
import { CheckCircle, RefreshCw, Bell, Clock, DollarSign, Star } from "lucide-react";

// Pricing data
import { pricingData } from "./Plan";
import { useNavigate } from "react-router-dom";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";

// Feature Component
const Feature = ({ icon, title, description }) => {
  return (
    <div className="flex gap-3 items-start">
      <span className="flex-shrink-0 mt-1">{icon}</span>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default function PaymentPlans() {
  const [selectedPlan, setSelectedPlan] = useState("freePlan");
  const navigate = useNavigate()
  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  const goToNextPage = () => {
    console.log("Selected plan:", selectedPlan);
    navigate(`/payments/selected-plan?selectedPlan=${selectedPlan}`)
    // Navigate to next page
  };

  // Convert pricing data to array format for easier mapping
  const plansArray = [
    { id: "freePlan", ...pricingData.freePlan },
    { id: "singlePass", ...pricingData.singlePass },
    { id: "aiProMonth", ...pricingData.aiProMonth },
    { id: "aiProYearly", ...pricingData.aiProYearly },
  ];

  const getPlanFeatures = (plan) => {
    const features = [];
    for (let i = 1; i <= 10; i++) {
      const feature = plan[`feature${i}`];
      if (feature) {
        features.push(feature);
      }
    }
    return features;
  };

  const formatPrice = (price, billingCycle) => {
    if (price === "0") return "Free";
    if (billingCycle === "single") return `$${price}`;
    if (billingCycle === "month") return `$${price}/mo`;
    if (billingCycle === "year") return `$${price}/yr`;
    return `$${price}`;
  };

  const getBillingText = (billingCycle) => {
    if (billingCycle === "single") return "One-time payment";
    if (billingCycle === "month") return "Monthly billing";
    if (billingCycle === "year") return "Yearly billing (Save 58%)";
    return billingCycle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  overflow-x-hidden">
      {/* Header */}
      <DashboardCandidatesHeader />
     

      <div className="max-w-7xl mx-auto px-6 py-8 mt-20">
        {/* Intro Section */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-8 rounded-2xl text-center mb-8 border border-blue-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ✨ Cast a wider net – 10x your job applications
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Our AI-powered platform scours millions of jobs to continuously find
            and apply to relevant job openings until you're hired.
          </p>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Kudos! You're one step closer to success 🎉
          </h2>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{pricingData.title}</h2>
          <p className="text-xl text-gray-600 mb-2">{pricingData.subtitle}</p>
          <p className="text-gray-500">{pricingData.intro}</p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plansArray.map((plan) => {
            const features = getPlanFeatures(plan);
            const isSelected = selectedPlan === plan.id;
            const isBestValue = plan.bestValue === "true";
            const isFree = plan.price === "0";

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${
                  isSelected 
                    ? "border-blue-500 shadow-xl ring-4 ring-blue-100" 
                    : isBestValue 
                    ? "border-orange-300 shadow-lg" 
                    : "border-gray-200 hover:border-gray-300"
                } ${isBestValue ? "transform scale-105" : ""}`}
                onClick={() => handlePlanSelection(plan.id)}
              >
                {/* Best Value Badge */}
                {/* {isBestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                      <Star size={14} className="fill-current" />
                      <span>{pricingData.bestValueLabel}</span>
                    </div>
                  </div>
                )} */}

                {/* Free Badge */}
                {/* {isFree && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      {pricingData.freeLabel}
                    </div>
                  </div>
                )} */}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}>
                      {isSelected && <CheckCircle size={14} className="text-white" />}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {formatPrice(plan.price, plan.billingCycle)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getBillingText(plan.billingCycle)}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 flex-grow">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features & Payment Section */}
        <div className="grid grid-cols-1 gap-8">
          {/* Features List */}
          {/* <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left">
              All Premium Features Included
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <Feature
                icon={<CheckCircle size={20} className="text-blue-600" />}
                title="AI-Powered Job Matching"
                description="Get real-time job recommendations tailored to your skills and experience."
              />
              <Feature
                icon={<RefreshCw size={20} className="text-blue-600" />}
                title="ATS-Optimized Resumes"
                description="Professionally crafted resumes designed to pass Applicant Tracking Systems."
              />
              <Feature
                icon={<Bell size={20} className="text-blue-600" />}
                title="Instant Job Alerts"
                description="Stay ahead with real-time notifications about new job openings."
              />
              <Feature
                icon={<Clock size={20} className="text-blue-600" />}
                title="Expert Resume Assistance"
                description="Get personalized resume reviews from industry professionals."
              />
              <Feature
                icon={<DollarSign size={20} className="text-blue-600" />}
                title="Career Community & Networking"
                description="Connect with industry peers, mentors, and recruiters."
              />
            </div>
          </div> */}

          {/* Action Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6">
                Selected Plan: <span className="font-semibold text-blue-600">
                  {plansArray.find(p => p.id === selectedPlan)?.title}
                </span>
              </p>
            </div>

            <button
              onClick={goToNextPage}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Continue to Payment
            </button>

            <div className="mt-8 space-y-4 text-center">
              <p className="text-gray-600">
                <strong>Got questions?</strong> Contact our customer support.
              </p>
              <p className="text-sm text-gray-500">
                You may cancel via email at{" "}
                <a 
                  href="mailto:customersupport@sentryspot.co.uk"
                  className="text-blue-600 hover:underline"
                >
                  customersupport@sentryspot.co.uk
                </a>
              </p>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  30-day money back guarantee
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Secure payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}