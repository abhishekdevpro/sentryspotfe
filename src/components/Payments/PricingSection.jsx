import React from "react";

// Pricing data structure
import { pricingData } from "./Plan";
import { Constant } from "@/utils/constant/constant";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  // Convert data object to array for mapping
  const plansArray = [
    pricingData.freePlan,
    pricingData.singlePass,
    pricingData.aiProMonth,
    pricingData.aiProYearly,
  ];

  // Get features as array from object
  const getFeatures = (plan) => {
    return Object.keys(plan)
      .filter(key => key.startsWith('feature'))
      .map(key => plan[key]);
  };
const navigate = useNavigate()
  const handleClick = () => {
    // Demo functionality - replace with your actual navigation logic
    const token = localStorage.getItem(Constant.USER_TOKEN)
    if(!token){
      navigate('/')
    }
    navigate('/payments/subscription')
  };

  return (
    <section className="">
      <div className="container">
        {/* Section Heading */}
        <div className="HelpBox">
          <p className="">
            {pricingData.title}
            {/* <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-slate-800 rounded-sm"></span> */}
          </p>
          <h2 >
            {pricingData.subtitle}
          </h2>
          <h2 className="">
            {pricingData.intro}
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 px-2 md:px-0">
          {plansArray.map((plan, index) => {
            const isPopular = plan.bestValue === "true";
            const isFree = plan.price === "0";
            const isDark = index === 2; // AI Pro Month gets dark theme
            
            return (
              <div
                key={plan.planId}
                className={`
                  flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300
                  ${isPopular ? 'transform -translate-y-3 border-2 border-slate-800' : 'border border-slate-200'}
                  ${isDark ? 'bg-slate-800 shadow-xl' : 'bg-white shadow-lg hover:shadow-xl'}
                `}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-3 right-3 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {pricingData.bestValueLabel}
                  </div>
                )}

                {/* Plan Header */}
                <div className={`p-8 pb-5 text-center border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                  <h3 className={`font-semibold text-xl mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {plan.title}
                  </h3>
                  <div className={`flex items-center justify-center gap-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    <div className="text-4xl font-bold leading-none">
                      ${plan.price}
                    </div>
                    <div className={`text-base opacity-70 self-end pb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {isFree ? '' : `/${plan.billingCycle === 'single' ? 'once' : plan.billingCycle}`}
                    </div>
                  </div>
                  {isFree && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      {pricingData.freeLabel}
                    </div>
                  )}
                </div>

                {/* Plan Features */}
                <div className="p-6 flex-1">
                  <ul className={`space-y-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {getFeatures(plan).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={`flex items-center text-sm py-2 border-b last:border-b-0 ${
                          isDark ? 'border-slate-700' : 'border-slate-100'
                        }`}
                      >
                        <i
                          className={`fas fa-check mr-3 font-bold ${
                            isDark ? 'text-cyan-400' : 'text-slate-800'
                          }`}
                        ></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={handleClick}
                    className={`
                      w-full py-4 px-5 rounded-lg font-semibold text-base text-white border-none cursor-pointer
                      transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1
                      ${isDark 
                        ? 'bg-slate-900 hover:bg-slate-950' 
                        : isPopular 
                        ? 'bg-slate-700 hover:bg-slate-800' 
                        : 'bg-slate-800 hover:bg-slate-900'
                      }
                    `}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;