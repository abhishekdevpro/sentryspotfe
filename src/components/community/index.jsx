
import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterDefault from "../footer/common-footer";
import LoginPopup from "../common/form/login/LoginPopup";
import DefaulHeader2 from "../header/DefaulHeader2";
import FilterSidebar from "./FilterSidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FilterleftSidebar from "./FilterleftSidebar"
import '../../../index.css'

import FeedSection from "./FeedSection";
const Index = () => {

  return (
    <>
      <LoginPopup />
      <DefaulHeader2 />
      {/* End Header */}

      <section className="ls-section bg-stone-200">
        <div className="auto-container">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              {/* <div className="filters-column hide-left">
                <FilterSidebar />
              </div> */}
            </div>

            <div className="filters-column hidden-1023 w-1/5 col-md-8 col-sm-8 ms-20">
              <FilterSidebar />
            </div>

              {/* <FeedSection /> */}
              {/* <div className="flex-1 h-screen overflow-y-scroll custom-scrollbar ">
              <FeedSection />
            </div> */}
            <div className="flex-1 h-screen overflow-y-scroll custom-scrollbar">
  <FeedSection />
</div>
            <div className="filters-column hidden-1023 w-1/4 col-md-8 col-sm-8">
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
