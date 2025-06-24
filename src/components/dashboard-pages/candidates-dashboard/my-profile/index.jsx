import React, { useState } from "react";
import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import ProfileVisalbilty from "./components/my-profile/ProfileVisalbilty";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import Certificate from "./components/Certificate";
import Skills from "./components/Skills";
import Additionalinformation from "./components/Additionalinformation";
import LanguageSection from "./components/my-profile/LanguageSection";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Personal Details",
      component: <MyProfile onNext={() => setCurrentStep(2)} />,
    },
    {
      id: 2,
      title: "Education ",
      component: <SocialNetworkBox onNext={() => setCurrentStep(3)} />,
    },
    {
      id: 3,
      title: "Work Experience",
      component: <ProfileVisalbilty onNext={() => setCurrentStep(4)} />,
    },
    {
      id: 4,
      title: "Resume",
      component: <ContactInfoBox onNext={() => setCurrentStep(5)} />,
    },
    {
      id: 5,
      title: "Skills",
      component: <Skills onNext={() => setCurrentStep(6)} />,
    },
    { id: 6, title: "Additional", component: <Additionalinformation /> },
    // { id: 7, title: "Languages", component: <LanguageSection /> },
  ];

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardCandidatesHeader />
      <DashboardCandidatesSidebar />

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile!" />
          <MenuToggler />

          {/* Top Progress Bar - Made more mobile friendly */}
          <div className="w-full rounded-t-lg px-2 sm:px-4">
            <div className="flex flex-col sm:flex-row gap-2 justify-around">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative cursor-pointer py-2 px-1 sm:px-2 w-full mx-1 sm:mx-2 text-center font-medium transition-colors duration-300 text-sm sm:text-base ${
                    currentStep === step.id
                      ? "text-blue-900 border rounded-md bg-white"
                      : "hover:bg-blue-300 hover:text-blue-800 bg-blue-800 text-white rounded-md"
                  }`}
                >
                  {step.title}
                  {index < steps.length - 1 && (
                    <span
                      className={`hidden sm:block absolute top-1 -right-6 h-2 mt-2.5 w-[24px] border-y bg-blue-800 ${
                        currentStep === step.id ? "bg-white" : ""
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Improved mobile layout */}
          <div className="mt-4 bg-gray-100 rounded-md mx-2 sm:mx-4">
            <h4 className="text-base sm:text-lg text-center ps-3 bg-blue-800 rounded-t-md w-full p-2 text-white">
              {steps[currentStep - 1].title}
            </h4>
            <div className="bg-white p-3 sm:p-6 rounded-md">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                {currentStep === 0 && (
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-start">
                      <label
                        htmlFor="visibility"
                        className="font-bold text-gray-700 cursor-pointer flex items-center text-sm sm:text-base"
                      >
                        Profile and CV Visibility
                        <div className="relative ml-4">
                          <input
                            type="checkbox"
                            id="visibility"
                            checked={isToggled}
                            onChange={() => setIsToggled(!isToggled)}
                            className="sr-only peer"
                          />
                          <div className="w-10 sm:w-12 h-5 sm:h-6 bg-gray-300 rounded-2xl shadow-inner peer-checked:bg-blue-500 transition-colors duration-300 cursor-pointer">
                            <div
                              className={`absolute top-0 left-0 w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
                                isToggled ? "translate-x-5 sm:translate-x-6" : "translate-x-0"
                              }`}
                            />
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Tooltip - Made more mobile friendly */}
                    <div className="relative inline-block">
                      <p
                        className="text border-2 px-2 border-gray-500 rounded-full cursor-pointer text-sm sm:text-base"
                        onMouseEnter={() => setIsTooltipVisible(true)}
                        onMouseLeave={() => setIsTooltipVisible(false)}
                      >
                        ℹ
                      </p>
                      {isTooltipVisible && (
                        <div className="absolute left-0 bottom-full mb-1 w-40 sm:w-48 p-2 bg-white border border-gray-300 rounded shadow-lg text-black text-xs sm:text-sm">
                          Activating this shows basic details to employers,
                          including contact details.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full">
                {steps[currentStep - 1].component}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default Index;
