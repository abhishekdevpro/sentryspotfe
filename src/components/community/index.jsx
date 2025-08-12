import React from "react";
import FooterDefault from "../footer/common-footer";
import LoginPopup from "../common/form/login/LoginPopup";
import DefaulHeader2 from "../header/DefaulHeader2";
import FilterSidebar from "./FilterSidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FilterleftSidebar from "./FilterleftSidebar"
import '../../../index.css'
import FeedSection from "./FeedSection";
import { Constant } from "@/utils/constant/constant";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";

const Index = () => {
  return (
    <>
      <LoginPopup />
      {localStorage.getItem(Constant.USER_TOKEN)? <DashboardCandidatesHeader />  :<DefaulHeader2 />}
      {/* End Header */}

      <section className="ls-section app-gradient-bg mt-10 md:20">
        <div className="auto-container px-2 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 ">
            {/* Left Sidebar - Hidden on mobile, visible on lg screens */}
            <div className="hidden lg:block w-1/5">
              <FilterSidebar />
            </div>

            {/* Main Content - Full width on mobile, 3/5 on lg screens */}
            <div className="w-full lg:w-3/5 ">
              <FeedSection />
            </div>

            {/* Right Sidebar - Hidden on mobile, visible on lg screens */}
            <div className="hidden lg:block w-1/5">
              <FilterleftSidebar />
            </div>
          </div>
        </div>
      </section>

      <FooterDefault />
    </>
  );
};

export default Index;
