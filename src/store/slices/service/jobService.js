import axiosInstance from "./axiosInstance";

// Function to fetch job list
export const fetchJobList = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryString = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${filters[key]}`)
      .join('&');

    const url = queryString ? `/jobseeker/job-list?${queryString}` : '/jobseeker/job-list';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch job list");
  }
}; 