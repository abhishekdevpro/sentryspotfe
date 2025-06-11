
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
      <div className="login-section">
        <div
          className="image-layer"
          style={{ backgroundImage: "url(/images/background/12.jpg)" }}
        ></div>
        <div className="outer-box ">
          {/* <!-- Login Form --> */}
          <div className="login-form default-form">
            <FormContent />
          </div>
          {/* <!--End Login Form --> */}
        </div>
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default index;
