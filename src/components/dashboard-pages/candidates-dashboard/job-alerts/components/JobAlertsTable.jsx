import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { FiCalendar, FiAward, FiEye } from 'react-icons/fi';
import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding, BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill, BsTrash } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmationDialog from './ConformationBox';

const JobAlertsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("6");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [jobToRemove, setJobToRemove] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); // default to newest first

  useEffect(() => {
    fetchSavedJobs();
  }, [timeFilter, sortOrder]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/view-favorite-jobs?is_favorite=1&filter_by=date&order_by=${sortOrder}`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      
      if (response.data.status === "success") {
        // Filter jobs based on selected time period
        // console.log(response.data.data,"filteredJobsData");
        const now = new Date();
        const filteredJobs = response.data.data
        // console.log(filteredJobs,"filteredJobs");
        setSavedJobs(filteredJobs);
        setError(null);
      } else {
        setError("Failed to fetch saved jobs");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching saved jobs");
      console.error("Error fetching saved jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (job) => {
    setJobToRemove(job);
    setShowConfirmDialog(true);
  };

  const handleRemoveFromFavorites = async () => {
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
        toast.success('Job removed from favorites', {
          position: 'top-right',
          duration: 3000,
        });
      } else {
        toast.error('Failed to remove job from favorites', {
          position: 'top-right',
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error removing job from favorites:", err);
      toast.error('An error occurred while removing the job', {
        position: 'top-right',
        duration: 3000,
      });
    } finally {
      setShowConfirmDialog(false);
      setJobToRemove(null);
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

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow h-full">
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex-grow">
          <Link to={`/job-single-v3/${job.id}`} className="block">
            {/* Job Title and Company Name */}
            <div className="mb-3 flex items-start gap-3">
              <div className="flex-shrink-0">
                <img
                  src={"/images/resource/company-logo/1-1.png"}
                  alt="company logo"
                  className="w-12 h-12 object-contain rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-1 line-clamp-2">
                  {job.job_title || "Untitled Position"}
                </h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <BsBuilding className="mr-1" />
                  <span className="line-clamp-1">{job.company_name || "Company Not Specified"}</span>
                </div>
              </div>
            </div>
            
            {/* Job Type Tags - Always show at least one */}
            <div className="flex flex-wrap gap-2 mb-3">
              {job.job_type_name && job.job_type_name.length > 0 ? (
                job.job_type_name.map((type, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                    <BsClock className="w-3 h-3" />
                    {type}
                  </span>
                ))
              ) : (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                  <BsClock className="w-3 h-3" />
                  Not Specified
                </span>
              )}
            </div>

            {/* Job Categories - Always show at least one */}
            <div className="flex flex-wrap gap-2 mb-3">
              {job.job_category_name && job.job_category_name.length > 0 ? (
                job.job_category_name.map((category, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-1">
                    <BsBriefcase className="w-3 h-3" />
                    {category}
                  </span>
                ))
              ) : (
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-1">
                  <BsBriefcase className="w-3 h-3" />
                  Uncategorized
                </span>
              )}
            </div>

            {/* Job Details - Always show all sections */}
            <div className="space-y-2">
              {/* Location - Always show */}
              <div className="flex items-center text-gray-500 text-sm">
                <BsGeoAlt className="text-gray-600 flex-shrink-0 mr-2" />
                <span className="line-clamp-1">
                  {job.location || job.complete_address || job.city || "Location Not Specified"}
                  {job.country && `, ${job.country}`}
                </span>
              </div>

              {/* Posted Date - Always show */}
              <div className="flex items-center text-gray-500 text-sm">
                <FiCalendar className="text-gray-600 flex-shrink-0 mr-2" />
                <span>
                  {job.created_at ? `Posted ${formatDate(job.created_at)}` : "Posted Date Not Available"}
                </span>
              </div>

              {/* Experience Level - Always show */}
              <div className="flex items-center text-gray-500 text-sm">
                <FiAward className="text-gray-600 flex-shrink-0 mr-2" />
                <span>
                  Experience: {job.experience_level_min_name || "Not Specified"}
                  {job.experience_level_max_name && ` - ${job.experience_level_max_name}`}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Action Buttons - Always show */}
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
            <BsTrash className="w-5 h-5" />
            <span>Remove</span>
          </button>
        </div>

        {/* Quick Apply Button - Always show */}
        <div className="mt-4">
          <Link
            to={`/apply/${job.id}`}
            className="w-full inline-flex justify-center items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <BsBookmark className="w-4 h-4" />
            Quick apply
          </Link>
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
            Saved Jobs
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              className="px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading saved jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 text-base sm:text-lg">
            {error}
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-gray-500">
            <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg sm:text-xl mb-2">No Saved Jobs</p>
            <p className="text-sm sm:text-base">Explore and save jobs you're interested in.</p>
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
          onClose={() => {
            setShowConfirmDialog(false);
            setJobToRemove(null);
          }}
          onConfirm={handleRemoveFromFavorites}
          title="Remove from Saved Jobs"
          description={`Are you sure you want to remove "${jobToRemove?.job_title}" from your saved jobs?`}
          confirmLabel="Remove"
          cancelLabel="Cancel"
          variant="destructive"
        />
      </div>
    </div>
  );
};

export default JobAlertsTable;