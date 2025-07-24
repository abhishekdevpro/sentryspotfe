// import SpotViewPage from "@/components/sentry-spot/hero";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";
import FooterDefault from "@/components/footer/common-footer/index";
import LoginPopup from "@/components/common/form/login/LoginPopup";

import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/sentry-spot/hero";

const SentryPage = () => {
  return (
    <>
      <LoginPopup />
      <DefaulHeader2 />
      {/* End Header */}
      <LoginPopup />

      {/* End MobileMenu */}
      <section className="job-categories border-none pb-0">
        <HeroSection />{" "}
      </section>

      

      <section className="job-categories py-16 border-none">
        {/* <section className="job-section  v"> */}
        <div className="auto-container flex flex-col md:flex-row justify-center items-center gap-3 p-10 py-14 border w-[95%] bg-gray-200 rounded-lg">
          <p className="text-2xl text-gray-800">
            Hiring? Your job ad seen by all the right people
          </p>
         <Link to={'https://employer.sentryspot.co.uk/'}>
         <button className="border-2 border-gray-800 rounded-lg p-2 px-4 text-lg duration-300 hover:bg-gray-300">
            Employer site
          </button>
         </Link>
        </div>
      </section>
      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default SentryPage;
