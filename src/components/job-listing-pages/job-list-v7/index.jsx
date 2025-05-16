import FooterDefault from "../../footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import FilterJobsBox from "./FilterJobsBox";
import FilterSidebar from "./FilterSidebar";
import { useState, useEffect } from "react";
import Companieslist from "./Companieslist";
import { useLocation, useNavigate } from "react-router-dom";
import Courselist from "./Courselist";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setActiveTab(hash);
    }
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`#${tab}`);
  };

  return (
    <>
      {/* Login Popup */}
      <LoginPopup />
      {/* Header */}
      <DefaulHeader2 />

      {/* Main Section */}
      <section className="ls-section py-8">
        <div className="auto-container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div
              className="offcanvas offcanvas-start lg:w-1/4 w-full mb-6 lg:mb-0 lg:block"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column lg:sticky lg:top-0 lg:h-full bg-white p-4 rounded-lg shadow-md lg:shadow-none">
                <FilterSidebar />
              </div>
            </div>

            {/* Content Column */}
            <div className="content-column flex-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="tabs-navigation flex flex-wrap justify-between lg:justify-start mb-4 border-b border-gray-300">
                  <button
                    className={`tab-button py-2 px-4 ${
                      activeTab === "tab1"
                        ? "border-b-2 rounded-sm border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("tab1")}
                  >
                    Jobs
                  </button>
                  <button
                    className={`tab-button py-2 px-4 ${
                      activeTab === "tab2"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("tab2")}
                  >
                    Companies
                  </button>
                  <button
                    className={`tab-button py-2 px-4 ${
                      activeTab === "tab3"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("tab3")}
                  >
                    Courses
                  </button>
                </div>

                {/* Tabs Content */}
                <div className="tabs-content">
                  {activeTab === "tab1" && (
                    <div className="border-gray-300 rounded-lg">
                      <FilterJobsBox />
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div className="p-4 bg-white border border-gray-300 rounded-lg">
                      <Companieslist />
                    </div>
                  )}
                  {activeTab === "tab3" && (
                    <div className="p-4 bg-white border border-gray-300 rounded-lg">
                      <Courselist />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* End Content Column */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* End Main Section */}

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default Index;
