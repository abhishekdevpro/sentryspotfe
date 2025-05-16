import axios from "axios";
import { BASE_URL } from "./constant/endPoints";
import { Constant } from "./constant/constant";

// const axiosRequest = axios.create({
//   baseURL: `${BASE_URL}`,
// });

// /**
//  * This interceptor is used to add the user's authentication token to the request headers.
//  * If a token exists in the local storage, it will be added to the 'Authorization' header.
//  * If no token is found, the header will remain unchanged.
//  *
//  * @param {Object} config - The configuration object for the axios request.
//  * @param {string} config.url - The URL for the request.
//  * @param {string} config.method - The HTTP method for the request.
//  * @param {Object} config.headers - The headers for the request.
//  * @returns {Object} - The modified configuration object with the updated headers.
//  */
// axiosRequest.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(Constant.USER_TOKEN);

//     return {
//       ...config,
//       headers: {
//         ...(token !== null && { Authorization: `Bearer ${token}` }),
//         ...config.headers,
//       },
//     };
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// /**
//  * This interceptor is used to handle responses from the axios requests.
//  * It checks for a 401 status code and performs the necessary actions if encountered.
//  *
//  * @param {Object} error - The error object returned by the axios request.
//  * @param {number} error.response.status - The HTTP status code of the response.
//  * @returns {Promise} - A promise that resolves with the original error or rejects with a new error.
//  */
// axiosRequest.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error?.response?.status === 401) {
//       // remove token from local storage
//       localStorage.removeItem(Constant.USER_TOKEN);
//       localStorage.removeItem(Constant.USER_INFO);
//       // reload page
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosRequest;

export const requestHandler = (url) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
};
