import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schema/LoginSchema";
import { toggleSignupDialog } from "@/store/slices/authSlice";
import ActionLoader from "../loader/ActionLoader";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "@/utils/constant/endPoints";
import { useNavigate } from "react-router-dom";
import { handleSendOTP } from "@/store/slices/service/authService";
import { sendOtp } from "@/store/slices/authSlice";
import { handleGoogleSignIn } from "@/store/slices/service/authService.js";

const Login = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (formData) => {
    console.log("Form submitted:", formData);
    const { email } = formData;

    if (!email) {
      toast.error("Please provide your email");
      return;
    }

    setSubmitting(true); // Show loading state

    try {
      console.log("Sending request to API with email:", email);
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/user/auth/login-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response);

      if (response.status === 200) {
        toast.success(response.data.message || "OTP sent to your email.");
        localStorage.setItem("userEmail", email);
        navigate("/login/login-code");
      } else {
        toast.error(response.data.message || "Failed to Send OTP");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false); // Hide loading state
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log("Manual submit triggered");
    const email = document.getElementById("email").value;
    if (!email) {
      toast.error("Please provide your email");
      return;
    }

    handleLogin({ email });
  };

  // const handleGoogleSignin = async () => {
  //   const url = `${BASE_URL}/api/user/auth/google`;

  //   try {
  //     const response = await axios.get(url);

  //     if (response.status === 200) {
  //       console.log("Google sign-in token: ", response.data.data);
  //       window.open(response.data.data);
  //     } else {
  //       toast.error("Google sign-in failed.");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(`${err.response?.data?.message || "Google sign-in failed"}`);
  //   }
  // };

  const handleGoogleSignin = async () => {
    try {
      const data = await handleGoogleSignIn();
      console.log("Google sign-in successful, data:", data);
      toast.success(data.message ||" Google sign-in successful, data")
    } catch (err) {
      console.error("Error during Google sign-in:", err.message);
      toast.error(`${err.message || "Google sign-in failed"}`);
    }
  };
  return (
    <Card className="w-[350px] sm:w-[400px] p-2 m-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl text-left font-ubuntu">
          Get started for Free
        </CardTitle>
      </CardHeader>
      <CardContent>
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
        <form
          className="flex justify-between space-x-2 flex-wrap gap-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              className={`${errors.email && "!border-red-500"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3 py-4 w-full duration-300 bg-[#2d1f89] hover:bg-blue-800"
            onClick={handleManualSubmit}
          >
            {loading || submitting ? <ActionLoader /> : "Send OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
