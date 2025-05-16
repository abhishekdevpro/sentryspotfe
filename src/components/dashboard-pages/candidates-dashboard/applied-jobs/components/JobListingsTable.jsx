import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding } from "react-icons/bs";
import { FiEye, FiTrash2, FiCalendar, FiAward } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import ConfirmationDialog from "@/components/community/ConfirmationDialog";
import { Constant } from "@/utils/constant/constant";


const JobListingsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("6");
  const [sortOrder, setSortOrder] = useState("desc"); // default to newest first
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [jobToRemove, setJobToRemove] = useState(null);

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

  const handleRemoveClick = (job) => {
    setJobToRemove(job);
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = async () => {
    if (!jobToRemove) return;

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobToRemove.id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      if (response.data.status === "success") {
        const updatedJobs = savedJobs.filter(job => job.id !== jobToRemove.id);
        setSavedJobs(updatedJobs);
        toast.success('Job removed from applied jobs', {
          position: 'top-right',
          duration: 3000,
        });
      } else {
        toast.error('Failed to remove job from applied jobs', {
          position: 'top-right',
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error removing job from applied jobs:", err);
      toast.error('An error occurred while removing the job', {
        position: 'top-right',
        duration: 3000,
      });
    } finally {
      setShowConfirmDialog(false);
      setJobToRemove(null);
    }
  };

  const handleCloseDialog = () => {
    setShowConfirmDialog(false);
    setJobToRemove(null);
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

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow h-full">
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
          <button
            onClick={() => handleRemoveClick(job)}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors p-2 text-sm"
          >
            <FiTrash2 className="w-5 h-5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Applied Jobs
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              className="px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemove}
          title="Remove from Applied Jobs"
          description={`Are you sure you want to remove "${jobToRemove?.job_title}" from your applied jobs? This action cannot be undone.`}
          confirmLabel="Remove"
          cancelLabel="Cancel"
          variant="destructive"
        />
      </div>
    </div>
  );
};

export default JobListingsTable;

// export default JobListingsTable;