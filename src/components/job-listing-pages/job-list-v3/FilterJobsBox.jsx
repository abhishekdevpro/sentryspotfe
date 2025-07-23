import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import JobCard from "./JobCard";
import useJobActions from "@/hooks/useJobActions";

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Please Login</h3>
        <p className="mb-6">You need to be logged in to perform this action.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const FilterJobsBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sort, setSort] = useState("des");
  const [perPage, setPerPage] = useState({ start: 0, end: 0 });
  const [isLoading, setIsLoading] = useState(true);
  // const [showPopup, setShowPopup] = useState(false);
  // const [selectedJobId, setSelectedJobId] = useState(null);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  // const [actionStatus, setActionStatus] = useState({});
  const {
    applyToJob,
    saveJob,
    selectedJobId,
    showPopup,
    closePopup,
    showLoginModal,
    closeLoginModal,
    actionStatus,
  } = useJobActions({ setFilteredJobs });

  const token = localStorage.getItem(Constant.USER_TOKEN);
  const navigate = useNavigate();

  const fetchJobs = async (params = searchParams) => {
    try {
      setIsLoading(true);
      const urlParams = new URLSearchParams(params);

      if (sort) {
        urlParams.set("filter_by", "date");
        urlParams.set("order_by", sort === "asc" ? "desc" : "asc");
      }
  
      const baseUrl = token ? "https://api.sentryspot.co.uk/api/jobseeker/job-list":
        "https://api.sentryspot.co.uk/api/jobseeker/public/job-list";
        
      const apiUrl = `${baseUrl}${
        urlParams.toString() ? `?${urlParams.toString()}` : ""
      }`;

      const response = await fetch(apiUrl,{
        headers:{
          Authorization : token? token : ""
        }
      });
      const data = await response.json();

      if (data.error) {
        console.error("Error fetching jobs:", data.error);
        toast.error(data.error);
        return;
      }

      setJobs(data.data);
      setFilteredJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams, sort]);

  const hasFilters = () => {
    return [...searchParams].some(
      ([key, value]) => value !== null && value !== ""
    );
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSort("");
    setPerPage({ start: 0, end: 0 });
    fetchJobs(new URLSearchParams());
  };


  const displayedJobs = filteredJobs?.slice(
    perPage.start,
    perPage.end !== 0 ? perPage.end : filteredJobs.length
  );

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">
          Loading jobs...
        </p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }

        /* Optional: Add a subtle scroll indicator */
        .scroll-container {
          position: relative;
        }

        .scroll-container::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(
            transparent,
            rgba(0, 0, 0, 0.1) 20%,
            rgba(0, 0, 0, 0.1) 80%,
            transparent
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .scroll-container:hover::after {
          opacity: 1;
        }
      `}</style>

      {/* Job Listings Header */}
      <div className="mb-4 flex justify-between items-center">
        <div className=" w-full flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold mb-1">All Jobs</h1>
            <p className="text-gray-500 text-sm">
              Jobs ({displayedJobs?.length} of {jobs.length})
            </p>
          </div>

          <div>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {/* <option value="">Recently Posted</option> */}
              <option value="asc">Newest</option>
              <option value="des">Oldest</option>
            </select>
          </div>
        </div>

        {/* {hasFilters() && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        )} */}
      </div>

      {/* Scrollable Job Listings Container */}
      <div className="scroll-container">
        <div
          className="custom-scrollbar max-h-[70vh] min-h-[400px] overflow-y-auto pr-2"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          <div className="grid grid-cols-1 gap-6 pb-4">
            {displayedJobs?.length > 0 ? (
              displayedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSaveJob={() => saveJob(job.id)}
                  onApplyJob={() => applyToJob(job.id)}
                  actionStatus={actionStatus}
                  showApplyButton={true}
                  showSaveButton={true}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-gray-500">
                  {hasFilters()
                    ? "Try adjusting your filters to see more results."
                    : "No jobs are currently available."}
                </p>
                {hasFilters() && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Listings Footer */}
      {/* {displayedJobs?.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-700 text-sm sm:text-base">
              Showing {displayedJobs?.length} of {jobs.length} Jobs
            </p>
            <div className="w-full sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(displayedJobs?.length / jobs.length) * 100}%` }}
              ></div>
            </div>
            {displayedJobs?.length < jobs.length && (
              <button 
                onClick={() => setPerPage({ start: 0, end: perPage.end + 10 })}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Show More ({jobs.length - displayedJobs?.length} remaining)
              </button>
            )}
          </div>
        </div>
      )} */}

      {/* Scroll to Top Button */}
      <button
        onClick={() => {
          const scrollContainer = document.querySelector(".custom-scrollbar");
          if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-40 opacity-75 hover:opacity-100"
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* {showPopup && selectedJobId && (
        <ApplyJobModalContent
          jobId={selectedJobId}
          onClose={handleClosePopup}
        />
      )} */}

      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
    </>
  );
};

export default FilterJobsBox;
