import FooterDefault from "../../footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterSidebar from "./FilterSidebar";
import FilterJobsBox from "./FilterJobsBox";

const index = () => {
    
    return (
        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

            <LoginPopup />
            {/* End Login Popup Modal */}

            <DefaulHeader2 />
            {/* End Header with upload cv btn */}

            {/* End Header */}
            {/* End MobileMenu */}

            {/* Mobile Filter Trigger Button - Moved to top */}
            <div className="show-1023 w-100 py-3 px-3 bg-white border-bottom sticky-top" style={{ zIndex: 1020 }}>
                <button
                    className="theme-btn btn-style-one w-100 d-flex align-items-center justify-content-center"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#filter-sidebar"
                    aria-controls="filter-sidebar"
                >
                    <i className="fa fa-filter me-2"></i>
                    Show Filters
                </button>
            </div>

            <section className="ls-section style-two">
                <div className="container">
                    <div className="row no-gutters px-3 px-md-4 px-lg-5">
                        {/* Mobile Filter Sidebar */}
                        <div
                            className="offcanvas offcanvas-start"
                            tabIndex="-1"
                            id="filter-sidebar"
                            aria-labelledby="filterSidebarLabel"
                            style={{ width: '100%', maxWidth: '320px' }}
                        >
                            <div className="offcanvas-header border-bottom">
                                <h5 className="offcanvas-title" id="filterSidebarLabel">Filters</h5>
                                <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body p-0">
                                <div className="filters-column">
                                    <FilterSidebar />
                                </div>
                            </div>
                        </div>

                        {/* Desktop Filter Sidebar */}
                        <div className="filters-column hidden-1023 col-xl-3 col-lg-4 col-md-12 col-sm-12 mt-4">
                            <FilterSidebar />
                        </div>
                        {/* <!-- End Filters Column --> */}

                        {/* Main Content and Right Sidebar */}
                        <div className="content-column col-xl-9 col-lg-8 col-md-12 col-sm-12">
                          <div className="row">
                            {/* Main Job List */}
                            <div className="col-lg-8 col-md-12 mt-4">
                              {/* Header Section */}
                              
                              <FilterJobsBox />
                            </div>
                            {/* Right Sidebar */}
                            <div className="col-lg-4 d-none d-lg-block mt-4">
                              <div className="bg-dark text-white rounded-4 p-4 d-flex flex-column align-items-center" style={{minHeight: 300}}>
                                <img src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?ga=GA1.1.138999916.1727698303&semt=ais_hybrid&w=740" alt="Find jobs" style={{width: "100% ",height:150, marginBottom: 24}} />
                                <h2 className="fw-bold mb-2" style={{fontSize: '1.5rem'}}>Find jobs <span className="fst-italic">near</span> you</h2>
                                <p className="mb-4 text-center text-light">Find career paths that match your skills and strengths.</p>
                                <button className="btn btn-danger px-4 py-2 fw-semibold" style={{backgroundColor: '#e51b3e', borderColor: '#e51b3e'}}>Find Jobs</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- End Content Column --> */}
                    </div>
                </div>
            </section>
            {/* <!--End Listing Page Section --> */}

            <FooterDefault footerStyle="alternate5" />
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
