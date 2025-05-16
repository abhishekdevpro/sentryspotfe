
import React from "react";
import FooterDefault from "../footer/common-footer";
import LoginPopup from "../common/form/login/LoginPopup";
import DefaulHeader2 from "../header/DefaulHeader2";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ApplyForm from "./ApplyForm";
import CompanyJobHeader from "./CompanyHeader";
import { useParams } from "react-router-dom";
const CoursePage = () => {
    const {id}=useParams();


  return (
    <>
      <LoginPopup />
      <DefaulHeader2 />
      {/* End Header */}

      <section className="ls-section bg-stone">
        <div className="auto-container">
          <div className="row">
            <CompanyJobHeader companyId={id}/>
            <ApplyForm companyId={id} />
          </div>
        </div>
      </section>

      <FooterDefault />
    </>
  );
};

export default CoursePage;
