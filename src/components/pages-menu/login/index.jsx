
import FormContent from "@/components/common/form/login/FormContent";
import MobileMenu from "../../header/MobileMenu";
import Header from "./Header";
import DefaulHeader from "@/components/header/DefaulHeader";
import DefaulHeader2 from "@/components/header/DefaulHeader2";

const index = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <!--End Main Header -->  */}

      {/* End Header */}
      {/* End MobileMenu */}
      <DefaulHeader2 />
      <div className="sm:p-2 overflow-hidden app-gradient-bg ">
        
       
            <FormContent />
         
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default index;
