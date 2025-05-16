// "use client";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import LoginWithSocial from "./LoginWithSocial";
// import ReCAPTCHA from "react-google-recaptcha";
// import { userLogin } from "../../../../store/slices/auth/actions.js";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import ActionLoader from "@/components/loader/ActionLoader";

// const FormContent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, userInfo, userToken, error, success, message } = useSelector(
//     (state) => state.auth
//   );

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitHandler = async (e) => {
//     if (email && password) {
//       e.preventDefault();
//       dispatch(userLogin({ email: email, password: password }));
//     }
//   };

//   function onChange(value) {
//     console.log("Captcha value:", value);
//   }

//   return (
//     <div className="form-inner">
//       <h3>Login to Sentry Spot</h3>

//       {/* <!--Login Form--> */}
//       <form onSubmit={submitHandler}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="Email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         {/* name */}
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {/* password */}
//         <div className="form-group">
//           <div className="field-outer">
//             <div className="input-group checkboxes square">
//               <input type="checkbox" name="remember-me" id="remember" />
//               <label htmlFor="remember" className="remember">
//                 <span className="custom-checkbox"></span> Remember me
//               </label>
//             </div>
//             <a href="#" className="pwd">
//               Forgot password?
//             </a>
//           </div>
//         </div>

//         {/* <div className="form-group">
//           <div className="field-outer">
//             <div className="input-group checkboxes square">
//               <input type="checkbox" name="service-me" id="service" required />
//               <label htmlFor="service" className="service">
//                 <span className="custom-checkbox">
//                   By using our Services, you agree to our terms of use
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>
//         <ReCAPTCHA
//         className="w-full flex justify-center"
//           sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//           onChange={onChange}
//         /> */}

//         <div className="form-group mt-2">
//           <button
//             type="submit"
//             name="log-in"
//             className="theme-btn btn-style-one bg-blue-900"
//             onClick={submitHandler}
//             disabled={loading}
//           >
//             {loading ? <ActionLoader /> : "Log In"}
//           </button>
//         </div>
//         {/* login */}
//       </form>
//       {/* End form */}

//       <div className="bottom-box">
//         <div className="text">
//           Don&apos;t have an account?{" "}
//           <Link
//             to="#"
//             className="call-modal signup"
//             data-bs-toggle="modal"
//             data-bs-target="#registerModal"
//           >
//             Signup
//           </Link>
//         </div>

//         {/* <div className="divider">
//           <span>or</span>
//         </div>
//   //  <LoginWithSocial /> */}

//       </div>

//     </div>
//   );
// };

// export default FormContent;

"use client";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginWithSocial from "./LoginWithSocial";
import ReCAPTCHA from "react-google-recaptcha";
import { userLogin } from "../../../../store/slices/auth/actions.js";
import { useSelector } from "react-redux";

import ActionLoader from "@/components/loader/ActionLoader";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormContent = () => {
  const navigate = useNavigate();
  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false); // New state for checkbox

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent form reload

    if (!email) {
      toast.error("Please provide your email");
      return;
    }

    try {
      console.log("Sending request to API with email:", email);

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/auth/send-loginotp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response);

      if (response.status === 200 && response.data) {
        toast.success(response.data.message || "OTP sent to your email.");
        localStorage.setItem("userEmail", email);
        navigate("/login/login-code");
      } else {
        toast.error(response.data?.message || "Failed to Send OTP");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleGoogleSignin = async () => {
    const url = "https://api.sentryspot.co.uk/api/jobseeker/auth/google";

    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        console.log("Google sign-in token: ", response.data.data);
        window.open(response.data.data);
      } else {
        toast.error("Google sign-in failed.");
      }
    } catch (err) {
      console.log(err);
      toast.error(`${err.response?.data?.message || "Google sign-in failed"}`);
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Sentry Spot</h3>
      <button
        onClick={handleGoogleSignin}
        type="button"
        className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4 shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        Continue with Google
      </button>
      <div className="p-4 flex justify-center items-center">
        <p>OR</p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Agree to Terms Checkbox */}
        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <label htmlFor="agree" className="remember">
                <span className="custom-checkbox"></span> I agree to the{" "}
                <Link
                  to="/terms-and-conditions"
                  className="text-blue-600 underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group mt-2">
          <button
            type="submit"
            name="log-in"
            className={`theme-btn btn-style-one bg-blue-900 text-white px-4 py-2 rounded-md transition duration-300 ${
              agreed
                ? "hover:bg-blue-800 cursor-pointer"
                : "bg-opacity-50 cursor-not-allowed"
            }`}
            disabled={loading || !agreed} // Button disabled if not agreed
          >
            {loading ? <ActionLoader /> : "Send OTP →"}
          </button>
        </div>
      </form>

      <div className="bottom-box"></div>
    </div>
  );
};

export default FormContent;
