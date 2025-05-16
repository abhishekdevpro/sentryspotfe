
import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterDefault from "../footer/common-footer";
import LoginPopup from "../common/form/login/LoginPopup";
import DefaulHeader2 from "../header/DefaulHeader2";
import "@fortawesome/fontawesome-free/css/all.min.css";

import DynamicCourseGrid from "./MyCourses";
const CoursePage = () => {

  return (
    <>
      <LoginPopup />
      <DefaulHeader2 />
      {/* End Header */}

      <section className="ls-section bg-stone-200">
        <div className="auto-container">
          <div className="row">
          <DynamicCourseGrid />
          </div>
        </div>
      </section>

      <FooterDefault />
    </>
  );
};

export default CoursePage;
