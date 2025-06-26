
"use client";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginWithSocial from "./LoginWithSocial";
import ReCAPTCHA from "react-google-recaptcha";
import { userLogin } from "../../../../store/slices/auth/actions.js";
import { useSelector } from "react-redux";

import ActionLoader from "@/components/loader/ActionLoader";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
        window.location.href = response.data.data;
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
