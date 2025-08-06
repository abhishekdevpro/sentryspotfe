import React, { useState } from "react";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import Jobreferral from "./ReferralForm";


const AddReferral = () => {
  

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardCandidatesHeader />
      <DashboardCandidatesSidebar />

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Add Job Referral" />
          <MenuToggler />
          <Jobreferral />


          {/* Top Progress Bar - Made more mobile friendly */}
          
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default AddReferral;
