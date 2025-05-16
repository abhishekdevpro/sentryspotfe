import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, VERS, EndpointSlug } from "@/utils/constant/endPoints";
import { logout } from "../authSlice";
import { Constant } from "@/utils/constant/constant";

export const Service = createApi({
  reducerPath: "Service",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(Constant.USER_TOKEN) || "";
      headers.set("Content-type", "application/json; charset=UTF-8");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    // Handle unauthorized responses
    fetchFn: async (url, options) => {
      const response = await fetch(url, options);
      if (response.status === 401) {
        // Clear the token if unauthorized
        const { store } = require("../../store");
        localStorage.removeItem(Constant.USER_TOKEN); // delete token from storage
        localStorage.removeItem(Constant.USER_INFO);

        store.dispatch(logout());
      }
      return response;
    },
  }),
  tagTypes: [""], // Add tag type
  endpoints: (builder) => ({
    getDummyData: builder.query({
      query: () => ({
        url: `${EndpointSlug.DUMMY_JSON}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDummyDataQuery } = Service;
