import { useEffect, useRef, useState } from "react";
import Register from "../register/Register";
import FormContent from "./FormContent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPopup = () => {
  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );

  return (
    <>
      <div className="modal " id="loginPopupModal">
        <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            ></button>
            {/* End close modal btn */}

            <div className="modal-body">
              {/* <!-- Login modal --> */}
              <div id="login-modal">
                {/* <!-- Login Form --> */}
                <div className="login-form default-form">
                  <FormContent />
                </div>
                {/* <!--End Login Form --> */}
              </div>
              {/* <!-- End Login Module --> */}
            </div>
            {/* En modal-body */}
          </div>
          {/* End modal-content */}
        </div>
      </div>
      {/* <!-- Login Popup Modal --> */}

     
      {/* <!-- Login Popup Modal --> */}
    </>
  );
};

export default LoginPopup;


// <div className="modal fade" id="registerModal">
// <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
//   <div className="modal-content">
//     <button
//       type="button"
//       className="closed-modal"
//       data-bs-dismiss="modal"
//     ></button>

//     <div className="modal-body">
//       {/* <!-- Login modal --> */}
//       <div id="login-modal" className="p-4">
//         <div className="login-form default-form">
//           <Register />
//         </div>
//         {/* <!--End Login Form --> */}
//       </div>
//       {/* <!-- End Login Module --> */}
//     </div>
//     {/* En modal-body */}
//   </div>
//   {/* End modal-content */}
// </div>
// </div>