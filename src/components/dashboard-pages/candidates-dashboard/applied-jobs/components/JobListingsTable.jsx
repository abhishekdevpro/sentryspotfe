import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding } from "react-icons/bs";
import { FiEye, FiCalendar, FiAward } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";
import JobCard from "@/components/job-listing-pages/job-list-v3/JobCard";

const JobListingsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("6");
  const [sortOrder, setSortOrder] = useState("desc"); // default to newest first

  useEffect(() => {
    fetchSavedJobs();
  }, [timeFilter, sortOrder]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1&filter_by=date&order_by=${sortOrder}`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      
      if (response.data.status === "success") {
        // Filter jobs based on selected time period
        const now = new Date();
        const filteredJobs = response.data.data.filter(job => {
          const jobDate = new Date(job.created_at);
          const monthsDiff = (now - jobDate) / (1000 * 60 * 60 * 24 * 30);
          return monthsDiff <= parseInt(timeFilter);
        });
        
        setSavedJobs(filteredJobs);
        setError(null);
      } else {
        setError("Failed to fetch applied jobs");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching applied jobs");
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };



 

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <p className="text-xl sm:text-2xl0">
            Applied Jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              className="px-3 sm:px-4 py-2 border rounded-lg bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-light"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest </option>
              <option value="asc">Oldest </option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading applied jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 text-base sm:text-lg">
            {error}
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-gray-500">
            <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg sm:text-xl mb-2">No Applied Jobs</p>
            <p className="text-sm sm:text-base">Explore and apply to jobs you're interested in.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job}
               showSaveButton={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingsTable;

// export default JobListingsTable;