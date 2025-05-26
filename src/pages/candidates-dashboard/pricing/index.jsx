import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "free",
    name: "Free Plan",
    price: "Free",
    priceValue: 0,
    priceDisplay: "Free",
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
    label: "Free Plan",
    display: "Free",
  },
  {
    id: "singlePass",
    name: "Single Pass",
    price: "£49",
    priceValue: 49,
    priceDisplay: "£49",
    features: [
      "Everything in Free +",
      "27 Unique Resume Templates",
      "5 Color Options & 6 Fonts",
      "Resume Parsing (ATS-Friendly)",
      "Free Cover Letter Builder",
      "All Resume Score & Feedback",
      "Skill Tests & Analysis",
      "AI-Enabled Content",
      "Auto-Improvement",
      "ATS Optimization",
    ],
    label: "single",
    display: "£49",
  },
  {
    id: "aiProMonth",
    name: "AI Pro Month",
    price: "£199/mo",
    priceValue: 199,
    priceDisplay: "£199/mo",
    features: [
      "Everything in Free +",
      "37 Unique Resume Templates",
      "8 Color Options & 6 Fonts",
      "Resume Parsing (ATS-Friendly)",
      "Free Cover Letter Builder",
      "All Resume Score & Feedback",
      "Skill Tests & Analysis",
      "AI-Enabled Content",
      "Auto-Improvement",
      "ATS Optimization",
    ],
    label: "month",
    display: "£199/mo",
  },
  {
    id: "aiProYearly",
    name: "AI Pro Yearly",
    price: "£499/yr",
    priceValue: 499,
    priceDisplay: "£499/yr",
    features: [
      "Everything in Free +",
      "37 Unique Resume Templates",
      "8 Color Options & 6 Fonts",
      "Resume Parsing (ATS-Friendly)",
      "Free Cover Letter Builder",
      "All Resume Score & Feedback",
      "Skill Tests & Analysis",
      "AI-Enabled Content",
      "Auto-Improvement",
      "ATS Optimization",
    ],
    label: "year",
    display: "£499/yr",
  },
];

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/candidates-dashboard/checkout?plan=${selectedPlan}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl">
        {/* Pricing Banner */}
        <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 flex items-center mb-4 justify-center">
          <span className="text-2xl mr-2">🎯</span>
          <span className="text-sm text-gray-700 font-medium">Cast a wider net - 10x your job applications</span>
        </div>
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold mb-1">Kudos! You're one step closer to success <span className="align-middle">🎉</span></h2>
          <div className="text-lg font-semibold mb-1">Pricing Plans</div>
          <div className="text-gray-500 text-sm mb-6">Choose the plan that works best for you<br/>Our pricing plans are designed to accommodate all your resume building needs.</div>
        </div>
        {/* Plans */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border-2 rounded-xl p-4 w-full md:w-1/4 flex flex-col items-start relative cursor-pointer ${selectedPlan === plan.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="absolute top-4 right-4">
                <input type="checkbox" checked={selectedPlan === plan.id} readOnly className="accent-orange-500" />
              </div>
              <div className="font-bold text-lg mb-1">{plan.name}</div>
              <div className={`text-2xl font-bold mb-1 ${plan.id === 'free' ? 'text-orange-600' : 'text-gray-700'}`}>{plan.priceDisplay}</div>
              <div className="text-xs text-gray-500 mb-2">{plan.label}</div>
              <ul className="text-sm space-y-1 mb-2">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
        {/* All subscription features */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
          <div className="font-semibold mb-2">All subscription features</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">⚡</span> <span>AI-Powered Job Matching<br/><span className="text-gray-500">Get real-time job recommendations tailored to your skills and experience.</span></span></div>
            <div className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">📄</span> <span>ATS-Optimized Resumes<br/><span className="text-gray-500">Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS).</span></span></div>
            <div className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">🔔</span> <span>Instant Job Alerts<br/><span className="text-gray-500">Stay ahead with real-time notifications about new job openings that match your profile.</span></span></div>
            <div className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">🧑‍💼</span> <span>Expert Resume Assistance<br/><span className="text-gray-500">Get personalized resume reviews and improvements from industry professionals.</span></span></div>
            <div className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">🌐</span> <span>Career Community & Networking<br/><span className="text-gray-500">Connect with industry peers, mentors, and recruiters to enhance your career opportunities.</span></span></div>
            <div className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">⚡</span> <span>One-Click Applications<br/><span className="text-gray-500">Apply faster and more efficiently with seamless, single-click job applications.</span></span></div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg text-lg w-full md:w-1/2 mb-2" onClick={handleNext}>Next</button>
          <div className="text-xs text-gray-500 mt-2">Got questions? Contact our customer support.<br/>You may cancel via email at <a href="mailto:customersupport@SentrySpot.com" className="text-blue-700 underline">customersupport@SentrySpot.com</a>.</div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 