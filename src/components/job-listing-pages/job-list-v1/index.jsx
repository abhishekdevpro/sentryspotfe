import FooterDefault from "../../../components/footer/common-footer";
import Breadcrumb from "../../common/Breadcrumb";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import FilterJobsBox from "./FilterJobsBox";
import FilterSidebar from "./FilterSidebar";

const index = () => {
    return (
        <>
            {/* <!-- Header Span --> */}
          

            <LoginPopup />
            {/* End Login Popup Modal */}
                
            <DefaulHeader2 />
            {/* End Header with upload cv btn */}

           {/* {/* End Header */}
             

            <FilterJobsBox />
            <FooterDefault footerStyle="alternate5" />
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
