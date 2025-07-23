// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant.js";
// import { FiCalendar, FiAward, FiEye } from 'react-icons/fi';
// import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding, BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill, BsTrash } from 'react-icons/bs';
// import toast, { Toaster } from 'react-hot-toast';
// import ConfirmationDialog from './ConformationBox';
// import JobCard from '@/components/job-listing-pages/job-list-v3/JobCard';

// const JobAlertsTable = () => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState("6");
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [jobToRemove, setJobToRemove] = useState(null);
//   const [sortOrder, setSortOrder] = useState("desc"); // default to newest first

//   useEffect(() => {
//     fetchSavedJobs();
//   }, [timeFilter, sortOrder]);

//   const fetchSavedJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/view-favorite-jobs?is_favorite=1&filter_by=date&order_by=${sortOrder}`,
//         {
//           headers: {
//             Authorization: token
//           }
//         }
//       );

//       if (response.data.status === "success") {
//         // Filter jobs based on selected time period
//         // console.log(response.data.data,"filteredJobsData");
//         const now = new Date();
//         const filteredJobs = response.data.data
//         // console.log(filteredJobs,"filteredJobs");
//         setSavedJobs(filteredJobs);
//         setError(null);
//       } else {
//         setError("Failed to fetch saved jobs");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching saved jobs");
//       console.error("Error fetching saved jobs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//             Saved Jobs
//           </h2>
//           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//             <select
//               className="px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//             >
//               <option value="desc">Newest</option>
//               <option value="asc">Oldest</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//             <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading saved jobs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 text-base sm:text-lg">
//             {error}
//           </div>
//         ) : savedJobs.length === 0 ? (
//           <div className="text-center py-12 sm:py-16 text-gray-500">
//             <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
//             <p className="text-lg sm:text-xl mb-2">No Saved Jobs</p>
//             <p className="text-sm sm:text-base">Explore and save jobs you're interested in.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//             {savedJobs.map((job) => (
//               <JobCard
//                key={job.id}
//                job={job}
//               //  onSaveJob={handleSaveJob}
//               //  onApplyJob={handleApplyJob}
//                />
//             ))}
//           </div>
//         )}

//         <ConfirmationDialog
//           isOpen={showConfirmDialog}
//           onClose={() => {
//             setShowConfirmDialog(false);
//             setJobToRemove(null);
//           }}
//           onConfirm={handleRemoveFromFavorites}
//           title="Remove from Saved Jobs"
//           description={`Are you sure you want to remove "${jobToRemove?.job_title}" from your saved jobs?`}
//           confirmLabel="Remove"
//           cancelLabel="Cancel"
//           variant="destructive"
//         />
//       </div>
//     </div>
//   );
// };

// export default JobAlertsTable;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { BsBriefcase } from "react-icons/bs";
import JobCard from "@/components/job-listing-pages/job-list-v3/JobCard";
import useJobActions from "@/hooks/useJobActions";

const JobAlertsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [jobToRemove, setJobToRemove] = useState(null);
  const { applyToJob, saveJob, actionStatus } = useJobActions({
    setFilteredJobs: setSavedJobs,
  });
  const navigate = useNavigate()
  useEffect(() => {
    fetchSavedJobs();
  }, [sortOrder]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/view-favorite-jobs?is_favorite=1&filter_by=date&order_by=${sortOrder}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        const jobs = Array.from(
          new Map(response.data.data.map((job) => [job.id, job])).values()
        );
        setSavedJobs(jobs || []);
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

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
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
            <p className="mt-4 text-gray-500 text-sm sm:text-base">
              Loading saved jobs...
            </p>
          </div>
        ): savedJobs.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-gray-500">
            <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg sm:text-xl mb-2">No Saved Jobs</p>
            <p className="text-sm sm:text-base">
              Explore and save jobs you're interested in.
            </p>
            <button
              onClick={() => navigate('/job-list-v3')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSaveJob={() => saveJob(job.id)}
                onApplyJob={() => applyToJob(job.id)}
                actionStatus={actionStatus}
                showApplyButton={true}
                showSaveButton={true}
              />
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default JobAlertsTable;
