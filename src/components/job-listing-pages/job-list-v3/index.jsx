
import { useState } from "react";
import FooterDefault from "../../footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterSidebar from "./FilterSidebar";
import FilterJobsBox from "./FilterJobsBox";

const Index = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <>
      {/* Header Span */}
      <span className="header-span"></span>

      <LoginPopup />
      <DefaulHeader2 />

      {/* Mobile Filter Trigger Button */}
      <div className="show-1023 w-100 py-3 px-3 bg-white border-bottom sticky-top" style={{ zIndex: 900 }}>
        <button
          className="theme-btn btn-style-one w-100 d-flex align-items-center justify-content-center"
          type="button"
          onClick={() => setShowMobileSidebar(true)}
        >
          <i className="fa fa-filter me-2"></i>
          Show Filters
        </button>
      </div>

      {/* Backdrop for mobile sidebar */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1040]"
          onClick={() => setShowMobileSidebar(false)}
        ></div>
      )}

      {/* Custom Mobile Sidebar */}
      {showMobileSidebar && (
        <div
          className="fixed top-0 left-0 h-full bg-white shadow-lg z-[1050]"
          style={{ width: "100%", maxWidth: "280px" }}
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h5 className="text-lg font-semibold">Filters</h5>
            <button
              className="text-gray-600 text-xl"
              onClick={() => setShowMobileSidebar(false)}
            >
              ✕
            </button>
          </div>
          <div className="p-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 56px)" }}>
            <FilterSidebar />
          </div>
        </div>
      )}

      <section className="ls-section style-two">
        <div className="container">
          <div className="row no-gutters px-3 px-md-4 px-lg-5">

            {/* Desktop Filter Sidebar */}
            <div className="filters-column hidden-1023 col-xl-3 col-lg-4 col-md-12 col-sm-12 mt-4">
              <FilterSidebar />
            </div>

            {/* Main Content and Right Sidebar */}
            <div className="content-column col-xl-9 col-lg-8 col-md-12 col-sm-12">
              <div className="row">
                {/* Main Job List */}
                <div className="col-lg-8 col-md-12 mt-4">
                  <FilterJobsBox />
                </div>

                {/* Right Sidebar Box */}
                <div className="col-lg-4 d-none d-lg-block mt-4">
                  <div
                    className="bg-dark text-white rounded-4 p-4 d-flex flex-column align-items-center"
                    style={{ minHeight: 300 }}
                  >
                    <img
                      src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?ga=GA1.1.138999916.1727698303&semt=ais_hybrid&w=740"
                      alt="Find jobs"
                      style={{ width: "100%", height: 150, marginBottom: 24 }}
                    />
                    <h2 className="fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
                      Find jobs near you
                    </h2>
                    <p className="mb-4 text-center text-light">
                      Find career paths that match your skills and strengths.
                    </p>
                    <button
                      className="btn btn-danger px-4 py-2 fw-semibold"
                      style={{ backgroundColor: "#e51b3e", borderColor: "#e51b3e" }}
                    >
                      Find Jobs
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* End Content Column */}
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default Index;
