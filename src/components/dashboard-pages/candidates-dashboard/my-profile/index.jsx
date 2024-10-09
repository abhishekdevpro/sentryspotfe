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
import { Switch } from "@/components/ui/switch";
import Certificate from "./components/Certificate";
import Skills from "./components/Skills";
import Additionalinformation from "./components/Additionalinformation";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Personal Details", component: <MyProfile onNext={() => setCurrentStep(2)} /> },
    { id: 2, title: "Education", component: <SocialNetworkBox onNext={() => setCurrentStep(3)} /> },
    { id: 3, title: "Professional Details", component: <ProfileVisalbilty onNext={() => setCurrentStep(4)} /> },
    { id: 4, title: "Resume", component: <ContactInfoBox onNext={() => setCurrentStep(5)} /> },
    { id: 5, title: "Skills & Recommendation", component: <Skills onNext={() => setCurrentStep(6)} /> },
    { id: 6, title: "Additional Information", component: <Additionalinformation /> },
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

          {/* Top Progress Bar */}
          <div className="w-full rounded-t-lg">
            <div className="flex flex-col md:flex-row gap-2 justify-around">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative cursor-pointer py-2 w-full mx-2 text-center font-medium transition-colors duration-300 ${
                    currentStep === step.id
                      ? "text-blue-900 text-xs border rounded-3xl bg-white"
                      : "hover:bg-blue-300 hover:text-blue-800 bg-blue-800 text-xs text-white rounded-3xl"
                  }`}
                >
                  {step.title}
                  {index < steps.length - 1 && (
                    <span
                      className={`absolute top-1 -right-6 h-2 mt-2.5 w-[24px] border-y bg-blue-800 ${
                        currentStep === step.id ? "bg-white" : ""
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 mt-2 bg-gray-100 rounded-md">
            <h4 className="text-lg ps-3 bg-blue-900 rounded-t-md w-full p-2 text-white">
              {steps[currentStep - 1].title}
            </h4>
            <div className="bg-white p-6 shadow-lg border-2 border-blue-900 rounded-md">
              <div className="flex justify-between items-center mb-4">
                {currentStep === 1 && (
                  <div className="flex items-center space-x-2">
                    <label htmlFor="visibility" className="font-bold">
                      Profile and CV Visibility
                    </label>
                    <Switch
                      id="visibility"
                      className="rounded-xl data-[state=checked]:bg-[#1502e6]"
                    />
                  </div>
                )}
              </div>
              {steps[currentStep - 1].component}
            </div>
          </div>
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default Index;
