"use client";

import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignUp } from "./actions";
import { Constant } from "@/utils/constant/constant";

let userToken, userInfo;
if (typeof window !== "undefined") {
  userToken = localStorage.getItem(Constant.USER_TOKEN);
  userInfo = JSON.parse(localStorage.getItem(Constant.USER_INFO));
}
// const userToken = localStorage.getItem(Constant.USER_TOKEN);
// const userInfo = localStorage.getItem(Constant.USER_INFO);
console.log(userInfo,userToken,"oyeeee");
const initialState = {
  loading: false,
  userToken,
  userInfo,
  error: false,
  success: false,
  message: "",
  user: {
    name: "John Doe",
    photo: "https://example.com/photo.jpg",
    profile: "Frontend Developer",
  },
};

// Handling State function or logics of User Authentication Module
// Replace the CreateSlice method with RTK function - createAPI for storing api data directly into slicer
export const AuthSlice = createSlice({
  name: `Auth`,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(Constant.USER_TOKEN); // delete token from storage
      localStorage.removeItem(Constant.USER_INFO);
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
      state.message = null;
      setTimeout(() => {
        window.location.reload();
      }, 300);
    },
    setLoader: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.userInfo = payload?.userInfo;
        state.message = payload?.message;
        state.userToken = payload?.data?.token;
        state.userInfo = payload?.data;
        state.success = true;
        state.error = false;
        window.location.href = "/candidates-dashboard/my-profile";
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
        state.success = false;
      })
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        state.userToken = payload?.data?.token;
        state.userInfo = payload?.data;
        state.error = false;
        window.location.href = "/";
      })
      .addCase(userSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
        state.success = false;
      });
  },
});

export const { logout, setLoader } = AuthSlice.actions;
export default AuthSlice.reducer;
