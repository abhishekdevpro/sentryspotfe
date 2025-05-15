// import React, { useState } from "react";
// import MobileMenu from "../../../header/MobileMenu";
// import LoginPopup from "../../../common/form/login/LoginPopup";
// import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
// import BreadCrumb from "../../BreadCrumb";
// import MyProfile from "./components/my-profile";
// import SocialNetworkBox from "./components/SocialNetworkBox";
// import ContactInfoBox from "./components/ContactInfoBox";
// import ProfileVisalbilty from "./components/my-profile/ProfileVisalbilty";
// import CopyrightFooter from "../../CopyrightFooter";
// import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
// import MenuToggler from "../../MenuToggler";
// import Certificate from "./components/Certificate";
// import Skills from "./components/Skills";
// import Additionalinformation from "./components/Additionalinformation";

// const Index = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isTooltipVisible, setIsTooltipVisible] = useState(false);
//   const [isToggled, setIsToggled] = useState(false); // State for the toggle switch

//   const steps = [
//     { id: 1, title: "Personal Details", component: <MyProfile onNext={() => setCurrentStep(2)} /> },
//     { id: 2, title: "Education (Most recent)", component: <SocialNetworkBox onNext={() => setCurrentStep(3)} /> },
//     { id: 3, title: "Professional Details", component: <ProfileVisalbilty onNext={() => setCurrentStep(4)} /> },
//     { id: 4, title: "Resume", component: <ContactInfoBox onNext={() => setCurrentStep(5)} /> },
//     { id: 5, title: "Skills", component: <Skills onNext={() => setCurrentStep(6)} /> },
//     { id: 6, title: "Additional Information", component: <Additionalinformation /> },
//   ];
// const token = localStorage.getItem("token")

//   return (
//     <div className="page-wrapper dashboard">
//       <span className="header-span"></span>

//       <LoginPopup />
//       <DashboardCandidatesHeader />
//       <DashboardCandidatesSidebar />

//       <section className="user-dashboard">
//         <div className="dashboard-outer">
//           <BreadCrumb title="My Profile!" />
//           <MenuToggler />

//           {/* Top Progress Bar */}
//           <div className="w-full rounded-t-lg">
//             <div className="flex flex-col md:flex-row gap-2 justify-around">
//               {steps.map((step, index) => (
//                 <div
//                   key={step.id}
//                   onClick={() => setCurrentStep(step.id)}
//                   className={`relative cursor-pointer py-2 w-full mx-2 text-center font-medium transition-colors duration-300 ${
//                     currentStep === step.id
//                       ? "text-blue-900 text-xs border rounded-3xl bg-white"
//                       : "hover:bg-blue-300 hover:text-blue-800 bg-blue-800 text-xs text-white rounded-3xl"
//                   }`}
//                 >
//                   {step.title}
//                   {index < steps.length - 1 && (
//                     <span
//                       className={`absolute top-1 -right-6 h-2 mt-2.5 w-[24px] border-y bg-blue-800 ${
//                         currentStep === step.id ? "bg-white" : ""
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="p-6 mt-2 bg-gray-100 rounded-md">
//             <h4 className="text-lg ps-3 bg-blue-900 rounded-t-md w-full p-2 text-white">
//               {steps[currentStep - 1].title}
//             </h4>
//             <div className="bg-white p-6 shadow-lg border-2 border-blue-900 rounded-md">
//               <div className="flex justify-between items-center mb-4">
//                 {currentStep === 1 && (
//                   <div className="flex items-center space-x-2">
//                     <label htmlFor="visibility" className="font-bold">
//                       Profile and CV Visibility
//                     </label>
//                     {/* Toggle Switch */}
//                     <div className="relative">
//                       <input
//                         type="checkbox"
//                         id="visibility"
//                         checked={isToggled}
//                         onChange={() => setIsToggled(!isToggled)}
//                         className="hidden peer"
//                       />
//                       <div className="w-12 h-6 bg-gray-300 rounded-xl shadow-inner peer-checked:bg-blue-500 cursor-pointer">
//                         <div
//                           className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
//                             isToggled ? "translate-x-6" : "translate-x-0"
//                           }`}
//                         />
//                       </div>
//                     </div>
//                     {/* Tooltip Trigger */}
//                     <div className="relative inline-block">
//                       <p
//                         className="text border-2 px-2 border-gray-500 rounded-full cursor-pointer"
//                         onMouseEnter={() => setIsTooltipVisible(true)}
//                         onMouseLeave={() => setIsTooltipVisible(false)}
//                       >
//                         ℹ
//                       </p>
//                       {/* Tooltip Content */}
//                       {isTooltipVisible && (
//                         <div className="absolute left-0 bottom-full mb-1 w-48 p-2 bg-white border border-gray-300 rounded shadow-lg text-black">
//                           Activating this shows basic details to employers, including contact details.
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               {steps[currentStep - 1].component}
//             </div>
//           </div>
//         </div>
//       </section>

//       <CopyrightFooter />
//     </div>
//   );
// };

// export default Index;
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
  const [isToggled, setIsToggled] = useState(false); // State for the toggle switch

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

          {/* Top Progress Bar */}
          <div className="w-full rounded-t-lg">
            <div className="flex flex-col md:flex-row gap-2 justify-around">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative cursor-pointer py-2 w-full mx-2 text-center font-medium transition-colors duration-300 ${
                    currentStep === step.id
                      ? "text-blue-900 text-md border rounded-md bg-white"
                      : "hover:bg-blue-300 hover:text-blue-800 bg-blue-800 text-md text-white rounded-md"
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
          <div className="mt-4 bg-gray-100 rounded-md">
            <h4 className="text-lg text-center ps-3 bg-blue-800 rounded-t-md w-full p-2 text-white">
              {steps[currentStep - 1].title}
            </h4>
            <div className="bg-white p-6 rounded-md">
              <div className="flex justify-between items-center mb-4">
                {currentStep === 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-4">
                      {/* Label */}
                      <label
                        htmlFor="visibility"
                        className="font-bold text-gray-700 cursor-pointer flex items-center"
                      >
                        Profile and CV Visibility
                        {/* Toggle Switch */}
                        <div className="relative ml-4">
                          <input
                            type="checkbox"
                            id="visibility"
                            checked={isToggled}
                            onChange={() => setIsToggled(!isToggled)}
                            className="sr-only peer" // Keeps input hidden but accessible
                          />
                          {/* Toggle Background */}
                          <div className="w-12 h-6 bg-gray-300 rounded-2xl shadow-inner peer-checked:bg-blue-500 transition-colors duration-300 cursor-pointer">
                            {/* Toggle Knob */}
                            <div
                              className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
                                isToggled ? "translate-x-6" : "translate-x-0"
                              }`}
                            />
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Tooltip Trigger */}
                    <div className="relative inline-block">
                      <p
                        className="text border-2 px-2 border-gray-500 rounded-full cursor-pointer"
                        onMouseEnter={() => setIsTooltipVisible(true)}
                        onMouseLeave={() => setIsTooltipVisible(false)}
                      >
                        ℹ
                      </p>
                      {/* Tooltip Content */}
                      {isTooltipVisible && (
                        <div className="absolute left-0 bottom-full mb-1 w-48 p-2 bg-white border border-gray-300 rounded shadow-lg text-black">
                          Activating this shows basic details to employers,
                          including contact details.
                        </div>
                      )}
                    </div>
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
