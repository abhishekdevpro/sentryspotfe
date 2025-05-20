import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import ApplyForm from "@/components/ApplyForm/ApplyForm";
import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding, BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FiCalendar, FiAward, FiEye } from 'react-icons/fi';

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
            to="/"
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
  const [sort, setSort] = useState("");
  const [perPage, setPerPage] = useState({ start: 0, end: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionStatus, setActionStatus] = useState({}); // To track the status of each job action

  const token = localStorage.getItem(Constant.USER_TOKEN);
  const navigate = useNavigate();

  const handleApplyNowClick = (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setActionStatus((prev) => ({ ...prev, [jobId]: "applying" })); // Set status to "applying"

    navigate(`/apply/${jobId}`);
    setSelectedJobId(jobId);
    setShowPopup(true);

    setActionStatus((prev) => ({ ...prev, [jobId]: "applied" })); // Set status to "applied"
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedJobId(null);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const savejob = async (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setActionStatus((prev) => ({ ...prev, [jobId]: "saving" })); // Set status to "saving"

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.status === "status" || response.data.code === 200) {
        toast.success(response.message || "Your job was successfully saved!");
        setActionStatus((prev) => ({ ...prev, [jobId]: "saved" })); // Set status to "saved"
      } else {
        toast.error("Failed to save the job. Please try again.");
        setActionStatus((prev) => ({ ...prev, [jobId]: "error" })); // Set status to "error"
      }
    } catch (error) {
      toast.error("An error occurred while saving the job. Please try again.");
      setActionStatus((prev) => ({ ...prev, [jobId]: "error" })); // Set status to "error"
    }
  };

  const fetchJobs = async (params = searchParams) => {
    try {
      setIsLoading(true);
      const urlParams = new URLSearchParams(params);

      // Add sorting parameters if they exist
      if (sort) {
        urlParams.set("filter_by", "date");
        urlParams.set("order_by", sort === "asc" ? "desc" : "asc");
      }

      // Use public API endpoint if user is not logged in
      const baseUrl = token 
        ? "https://api.sentryspot.co.uk/api/jobseeker/job-list"
        : "https://api.sentryspot.co.uk/api/jobseeker/public/job-list";

      const apiUrl = `${baseUrl}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;

      const headers = token ? { 'Authorization': token } : {};
      
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();

      setJobs(data.data);
      setFilteredJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
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

  const sortHandler = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);
  };

  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    setPerPage(pageData);
  };

  let content = filteredJobs
    ?.slice(
      perPage.start,
      perPage.end !== 0 ? perPage.end : filteredJobs.length
    )
    ?.map((item) => (
      <div
        className="col-lg-6 col-md-12 col-sm-12 mb-4"
        key={item.id}
      >
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow h-full">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <Link to={`/job-single-v3/${item.id}`} className="block">
                {/* Company Logo and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={item.logo || "/images/resource/company-logo/1-1.png"}
                      alt="company logo"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2">
                      {item.job_title}
                    </h4>
                    <div className="flex items-center text-gray-600 text-sm">
                      <BsBuilding className="mr-1" />
                      <span className="line-clamp-1">{item.company_name || "Company Not Specified"}</span>
                    </div>
                  </div>
                </div>

                {/* Job Type Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.job_type_name && item.job_type_name.length > 0 ? (
                    item.job_type_name.map((type, index) => (
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

                {/* Job Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.job_category_name && item.job_category_name.length > 0 ? (
                    item.job_category_name.map((category, index) => (
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

                {/* Job Details */}
                <div className="space-y-2">
                  {/* Location */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <BsGeoAlt className="text-gray-600 flex-shrink-0 mr-2" />
                    <span className="line-clamp-1">
                      {item.location || item.complete_address || item.city || "Location Not Specified"}
                      {item.country && `, ${item.country}`}
                    </span>
                  </div>

                  {/* Posted Date */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiCalendar className="text-gray-600 flex-shrink-0 mr-2" />
                    <span>
                      {item.created_at ? `Posted ${new Date(item.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}` : "Posted Date Not Available"}
                    </span>
                  </div>

                  {/* Experience Level */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiAward className="text-gray-600 flex-shrink-0 mr-2" />
                    <span>
                      Experience: {item.experience_level_min_name || "Not Specified"}
                      {item.experience_level_max_name && ` - ${item.experience_level_max_name}`}
                    </span>
                  </div>

                  {/* Industry */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <BsBuilding className="text-gray-600 flex-shrink-0 mr-2" />
                    <span>{item.industry || "Industry Not Specified"}</span>
                  </div>

                  {/* Functional Area */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <BsBriefcase className="text-gray-600 flex-shrink-0 mr-2" />
                    <span>{item.functional_area_name || "Functional Area Not Specified"}</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <Link 
                to={`/job-single-v3/${item.id}`}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors p-2 text-sm"
              >
                <FiEye className="w-5 h-5" />
                <span>View Details</span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    await savejob(item.id);
                    setFilteredJobs((prevJobs) =>
                      prevJobs.map((job) =>
                        job.id === item.id
                          ? { ...job, is_favorite: !item.is_favorite }
                          : job
                      )
                    );
                  }}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors p-2 text-sm"
                >
                  {item.is_favorite ? (
                    <BsHeartFill className="w-5 h-5 text-red-500" />
                  ) : (
                    <BsHeart className="w-5 h-5" />
                  )}
                  <span>{item.is_favorite ? "Saved" : "Save"}</span>
                </button>
                <button
                  onClick={() => {
                    handleApplyNowClick(item.id);
                    setFilteredJobs((prevJobs) =>
                      prevJobs.map((job) =>
                        job.id === item.id ? { ...job, is_applied: true } : job
                      )
                    );
                  }}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors p-2 text-sm"
                >
                  {item.is_applied ? (
                    <BsBookmarkFill className="w-5 h-5 text-blue-600" />
                  ) : (
                    <BsBookmark className="w-5 h-5" />
                  )}
                  <span>{item.is_applied ? "Applied" : "Apply"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading jobs...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
          <div className="text-gray-700">
            Showing <strong>{content?.length}</strong> jobs
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={sort}
              className="px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onChange={sortHandler}
            >
              <option value="">Sort by (default)</option>
              <option value="asc">Newest</option>
              <option value="des">Oldest</option>
            </select>

            {hasFilters() && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row">{content}</div>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-700">
            Showing {content?.length} of {jobs.length} Jobs
          </p>
          <div className="w-full sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(content?.length / jobs.length) * 100}%` }}
            ></div>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Show More
          </button>
        </div>
      </div>

      {showPopup && selectedJobId && (
        <ApplyJobModalContent
          jobId={selectedJobId}
          onClose={handleClosePopup}
        />
      )}

      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
    </>
  );
};

export default FilterJobsBox;
