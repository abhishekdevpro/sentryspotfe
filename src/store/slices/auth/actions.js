import { createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_URL, VERS, EndpointSlug } from "@/utils/constant/endPoints";
import { Constant } from "@/utils/constant/constant";
import { requestHandler } from "@/utils/axiosRequest";
import toast from "react-hot-toast";

const instance = requestHandler(BASE_URL);

// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const { data } = await instance.post(`${EndpointSlug.SIGNIN}`, {
//         email,
//         password,
//       });

//       // store user's data in local storage
//       localStorage.setItem(Constant.USER_TOKEN, data?.data?.token);
//       localStorage.setItem(USER_INFO, JSON.stringify(data?.data));
//       toast.success(data?.message || "Success");
//       console.log(data?.message || "Success");
//       return { ...data, message: "Successfully login" };
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           error?.response?.statusText ||
//           "Invalid credentials"
//       );
//       if (error?.response?.status == 401) {
//         return rejectWithValue(
//           error?.response?.data?.detail || "Invalid credentials"
//         );
//       } else if (error?.response && error?.response?.status == 422) {
//         return rejectWithValue(
//           error?.response?.data?.detail[0]?.msg || "Unprocessable Content"
//         );
//       } else {
//         return rejectWithValue(error?.message || "Something went wrong");
//       }
//     }
//   }
// );

// export const userSignUp = createAsyncThunk(
//   "auth/signup",
//   async (body, { rejectWithValue }) => {
//     console.log("register dasta", body);

//     try {
//       const { data } = await instance.post(`${EndpointSlug.SIGNUP}`, body);
//       if (data?.status === "success") {
//         // store user's data in local storage
//         localStorage.setItem(Constant.USER_TOKEN, data?.data?.token);
//         localStorage.setItem(Constant.USER_INFO, JSON.stringify(data?.data));
//         toast.success(data?.message || "Success");
//       }
//       return { ...data };
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || error?.response?.statusText
//       );
//       if (error?.response?.status == 400) {
//         return rejectWithValue(error?.response?.data?.detail || "Bad Request");
//       } else if (error?.response?.status == 401) {
//         return rejectWithValue(
//           error?.response?.data?.detail || "Invalid credentials"
//         );
//       } else if (error.response && error.response.status == 422) {
//         return rejectWithValue(
//           error?.response?.data?.detail[0]?.msg || "Unprocessable Content"
//         );
//       } else {
//         return rejectWithValue(error.message || "Something went wrong");
//       }
//     }
//   }
// );

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`${EndpointSlug.SIGNIN}`, {
        email,
        password,
      });

      const { data } = response;

      // Debugging: Check the response structure
      console.log("Login Response:", data);

      // Ensure response structure aligns with the expected data format
      if (data?.status === "success" && data?.data?.token) {
        // Store user's data in local storage
        localStorage.setItem(Constant.USER_TOKEN, data?.data?.token);
        localStorage.setItem(Constant.USER_INFO, JSON.stringify(data?.data));
        toast.success(data?.message || "Successfully logged in!");
        return { ...data, message: "Successfully logged in" };
      } else {
        // Handle unexpected response structure
        toast.error(data?.message || "Unexpected response format");
        return rejectWithValue(data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);

      // Handle specific HTTP status codes
      if (error?.response?.status === 401) {
        return rejectWithValue(
          error?.response?.data?.detail || "Invalid credentials"
        );
      } else if (error?.response?.status === 422) {
        return rejectWithValue(
          error?.response?.data?.detail?.[0]?.msg || "Unprocessable Content"
        );
      } else {
        // General error fallback
        return rejectWithValue(error?.message || "Something went wrong");
      }
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/signup",
  async (body, { rejectWithValue }) => {
    try {
      const response = await instance.post(`${EndpointSlug.SIGNUP}`, body);
      const { data } = response;

      // Debugging: Check the response structure
      console.log("SignUp Response:", data);

      // Ensure response structure aligns with the expected data format
      if (data?.status === "success" && data?.data?.token) {
        // Store user's data in local storage
        localStorage.setItem(Constant.USER_TOKEN, data?.data?.token);
        localStorage.setItem(Constant.USER_INFO, JSON.stringify(data?.data));
        toast.success(data?.message || "Successfully signed up!");
        return { ...data };
      } else {
        // Handle unexpected response structure
        toast.error(data?.message || "Unexpected response format");
        return rejectWithValue(data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("SignUp Error:", error);

      // Handle specific HTTP status codes
      if (error?.response?.status === 400) {
        return rejectWithValue(error?.response?.data?.detail || "Bad Request");
      } else if (error?.response?.status === 401) {
        return rejectWithValue(
          error?.response?.data?.detail || "Invalid credentials"
        );
      } else if (error?.response?.status === 422) {
        return rejectWithValue(
          error?.response?.data?.detail?.[0]?.msg || "Unprocessable Content"
        );
      } else {
        // General error fallback
        return rejectWithValue(error?.message || "Something went wrong");
      }
    }
  }
);

