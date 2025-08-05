import LoginPopup from "@/components/common/form/login/LoginPopup";
// import MobileMenu from "../../../header/MobileMenu";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "@/components/header/DashboardCandidatesSidebar";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import InterviewList from "./InterViewList";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      {/* End Header */}
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Interview List" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <InterviewList />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
     
    </div>
    // End page-wrapper
  );
};

export default index;
