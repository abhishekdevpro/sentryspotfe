import React from "react";
import ShowcaseComponent from "@/components/showcase/Showcase";
import FooterDefault from "@/components/footer/common-footer";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import MobileMenu from "@/components/header/MobileMenu";
import { useParams } from "react-router-dom";
import DefaulHeader2 from "@/components/header/DefaulHeader2";

const Showcase = () => {
  const { companyId } = useParams();
  return (
    <>
      {/* <!-- Header Span --> */}
      {/* <span className="header-span"></span> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      <ShowcaseComponent companyId={companyId} />

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Showcase;
