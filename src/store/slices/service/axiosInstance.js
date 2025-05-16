import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: "https://api.sentryspot.co.uk/api",
    headers: {
        "Content-Type": "application/json",
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(Constant.USER_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 401) {
            // Clear user data
            localStorage.removeItem(Constant.USER_TOKEN);
            localStorage.removeItem(Constant.USER_INFO);
            
            // Show error message
            toast.error("Session expired. Please login again.");
            
            // Redirect to login page
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;