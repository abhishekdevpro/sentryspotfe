
import React, { useEffect, useState } from "react";

import FooterDefault from "../footer/common-footer";
import LoginPopup from "../common/form/login/LoginPopup";
import DefaulHeader2 from "../header/DefaulHeader2";
import UserProfilePage from "./userPublicProfile";
const PublicProfile = () => {

  return (
    <>
      <LoginPopup />
      <DefaulHeader2 />
      {/* End Header */}

      <section className="ls-section app-gradient-bg">
        <div className="auto-container">
          <div className="row">
          <UserProfilePage />
          </div>
        </div>
      </section>

      <FooterDefault />
    </>
  );
};

export default PublicProfile;
