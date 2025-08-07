

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ActionLoader from "@/components/loader/ActionLoader";
import Logo from "../../../../../public/company_logo.png";
import { Button } from "@/components/ui/button";
const FormContent = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleGoogleSignin = async () => {
    try {
      const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/auth/google");
      if (response.status === 200) {
        window.location.href = response.data.data;
      } else {
        toast.error("Google sign-in failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Google sign-in failed");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please provide your email");

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/auth/send-loginotp",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success(response.data.message || "OTP sent to your email.");
        localStorage.setItem("userEmail", email);
        navigate("/login/login-code");
      } else {
        toast.error(response.data?.message || "Failed to Send OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="overflow-y-hidden w-full flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="bg-gray-50 rounded-xl shadow-mb border-2 border-gray-50 w-full max-w-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-10 sm:h-12 object-contain" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 mt-1 mb-6 text-sm">
          People across the globe are joining us to upgrade their career with our Robust AI.
        </p>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          Continue with Google
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={submitHandler}>
          <div className="form-group ">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email ID
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-2 w-full border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link to="/terms-and-conditions" className="text-blue-600 underline">
                Terms & Conditions
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            // className={`w-full rounded-full py-2 text-white text-sm font-semibold transition ${
            //   agreed
            //     ? "bg-blue-900 hover:bg-blue-800"
            //     : "bg-blue-900 opacity-50 cursor-not-allowed"
            // }`}
            disabled={!agreed || loading}
          >
            {loading ? <ActionLoader /> : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormContent;

