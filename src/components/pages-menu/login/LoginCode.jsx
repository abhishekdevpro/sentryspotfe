import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";
import { useDispatch } from "react-redux";
import { loginWithOtp } from "@/store/slices/authSlice";
import axiosInstance from "@/store/slices/service/axiosInstance";

const LoginCode = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to login if no email found
      toast.error("Email not found. Please login again.");
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const { otp } = data;

    if (otp.length !== 6) {
      setError("otp", {
        type: "manual",
        message: "Please enter a valid 6-digit OTP.",
      });
      return;
    }

    setLoading(true);

    try {
      // Use the Redux action instead of direct API call
      const result = await dispatch(loginWithOtp({ email, otp })).unwrap();
      
      if (result?.data?.token) {
        // Store token in localStorage
        localStorage.setItem(Constant.USER_TOKEN, result.data.token);
        // Store user info in localStorage
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        
        toast.success("Login successful!");
        navigate("/candidates-dashboard/my-profile");
      } else {
        toast.error("Invalid response from server. Token not found.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/jobseeker/auth/send-loginotp", {
        email,
      });

      if (response.status === 200) {
        toast.success("New OTP sent to your email.");
      } else {
        toast.error("Failed to send new OTP.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/login"
          className="text-blue-600 flex items-center mb-6 hover:text-blue-700"
        >
          <span className="mr-2">←</span> Back
        </Link>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://htmlsentryspot.vercel.app/img/company_logo.png"
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Sign in with login code
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We have sent your one-time passcode to <br />
          <strong className="text-blue-700">{email}</strong>. This passcode will
          expire after 5 minutes.
        </p>

        {/* Form with react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OTP Input */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Enter 6-digit code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit OTP",
                },
              })}
              maxLength={6}
              className="w-full text-center text-xl py-2 px-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="______"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-center mt-4 space-y-2">
          <button
            onClick={handleResendCode}
            className="text-blue-600 font-semibold hover:text-blue-700 text-sm"
            disabled={loading}
          >
            Resend verification code
          </button>
          <p>
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-700 text-sm"
            >
              Don't have access to this email?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCode;
