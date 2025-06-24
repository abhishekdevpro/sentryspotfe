import { Constant } from "@/utils/constant/constant";
import axiosInstance from "./axiosInstance";

// Function to send OTP to the user's email
export const handleSendOTP = async (email) => {
   try {
      const response = await axiosInstance.post("/jobseeker/auth/send-loginotp", {email});
      console.log(response,"api Response");
      return response.data; // Return only the response data
   } catch (error) {
      throw new Error(error.response?.data?.message || "Error while sending OTP.");
   }
};

// Function to verify OTP login
export const verifyOtpLogin = async (email, otp) => {
   try {
      const response = await axiosInstance.post("/jobseeker/auth/login-otp", { email, otp });

      return response.data; // Return the token if available
   } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid OTP. Please try again.");
   }
};

// Function to resend OTP
export const resendOtp = async (email) => {
   try {
      const response = await axiosInstance.post("/user/auth/login-otp", { email });

      return response; // Return only response data for consistency
   } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to resend OTP.");
   }
};
export const handleGoogleSignIn = async () => {
   try {
     const response = await axiosInstance.get('/jobseeker/auth/google');
 
     if (response.status === 200) {
       console.log("Google sign-in token:", response.data.data);
       window.open(response.data.data, "_self"); // Open in the same tab
       return response.data; // Returning the response data
     } else {
       // Throw an error if status is not 200
       throw new Error("Google sign-in failed.");
     }
   } catch (error) {
     console.error("Google sign-in error:", error);
     
     // Handle error properly with a fallback message
     throw new Error(error.response?.data?.message || "Google sign-in failed.");
   }
 };


 export const sendAuthCode = async (code) => {
   try {
     const response = await axiosInstance.get(`/jobseeker/auth/callback?code=${code}`);
     console.log(response);
     if (response.status === 200) {
       const token = response.data.data.token;
 
       // Store the token in localStorage
       localStorage.setItem(Constant.USER_TOKEN, token);
       localStorage.setItem("userInfo", response.data.data);
       return response.data.data; 
     } else {
       throw new Error("Authentication failed");
     }
   } catch (error) {
     console.error("Error while sending auth code:", error);
     throw new Error(error.response?.data?.message || "Authentication failed");
   }
 };