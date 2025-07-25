import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import CopyrightFooter from "../../CopyrightFooter";
import JobApplied from "./components/JobApplied";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import TopSection from "./components/Topsection.jsx";
import { Constant } from "@/utils/constant/constant";
import { useSelector } from "react-redux";

const Index = () => {
  const {userInfo} = useSelector((state)=>state.auth);
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
        <div className="dashboard-outer ">
          <BreadCrumb title={`Howdy ${userInfo?.first_name} `} />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row ">
            <TopCardBlock />
          </div>
          {/* End .row top card block */}
          <div className="row">
            {/* <div className="col-xl-7 col-lg-12">
              {/* <!-- Graph widget --> 
              <div className="graph-widget ls-widget">
                <ProfileChart />
              </div>
              {/* End profile chart
            </div>
            

            <div className="col-xl-5 col-lg-12">
              {/* <!-- Notification Widget --> 
              <div className="notification-widget ls-widget">
                <div className="widget-title">
                  <h4>Notifications</h4>
                </div>
                <div className="widget-content">
                  <Notification />
                </div>
              </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="graph-widget ls-widget">
              <ProfileChart />
            </div>
            {/* End profile chart */}

            <div className="notification-widget ls-widget">
              <div className="widget-title">
                <h4>Notifications</h4>
              </div>
              <div className="widget-content">
                <Notification />
              </div>
            </div>
          </div>
            {/* End .col */}

            <div className="col-lg-12">
              {/* <!-- applicants Widget --> */}
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Jobs Applied Recently</h4>
                </div>
                <div className="widget-content">
                  <div className="job-listings">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="job-block">
                          <JobApplied />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* End .col */}
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
