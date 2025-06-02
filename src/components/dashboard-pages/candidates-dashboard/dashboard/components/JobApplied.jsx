import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding } from "react-icons/bs";
import { FiEye, FiCalendar, FiAward } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";

const JobApplied = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1&filter_by=date&order_by=desc`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      
      if (response.data.status === "success") {
        setAppliedJobs(response.data.data.slice(0, 6));
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading applied jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <BsBriefcase className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm">No Applied Jobs</p>
        <p className="text-xs">Explore and apply to jobs you're interested in.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {appliedJobs.map((job) => (
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow h-full" key={job.id}>
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <Link to={`/job-single-v3/${job.id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-2 line-clamp-2">
                  {job.job_title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.job_type_name && job.job_type_name.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                      <BsClock className="w-3 h-3" />
                      {type}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <BsBuilding className="text-gray-600 flex-shrink-0" />
                  <p className="text-gray-600 font-medium text-sm line-clamp-1">
                    {job.company_name || "Company Name"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.job_category_name && job.job_category_name.map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-1">
                      <BsBriefcase className="w-3 h-3" />
                      {category}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <BsGeoAlt className="text-gray-600 flex-shrink-0 mr-2" />
                    <span className="line-clamp-1">
                      {job.location || job.complete_address || job.city || "Location N/A"}{" "}
                      {job.country && `, ${job.country}`}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiCalendar className="text-gray-600 flex-shrink-0 mr-2" />
                    <span>Posted {formatDate(job.created_at)}</span>
                  </div>
                  {job.experience_level_min_name && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiAward className="text-gray-600 flex-shrink-0 mr-2" />
                      <span>Experience: {job.experience_level_min_name}</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <Link 
                to={`/job-single-v3/${job.id}`}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors p-2 text-sm"
              >
                <FiEye className="w-5 h-5" />
                <span>View Details</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobApplied;
