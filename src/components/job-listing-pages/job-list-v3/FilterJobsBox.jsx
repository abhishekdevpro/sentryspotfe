import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import ApplyForm from "@/components/ApplyForm/ApplyForm";
import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding, BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FiCalendar, FiAward } from 'react-icons/fi';

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
      const baseUrl = "https://api.sentryspot.co.uk/api/jobseeker/public/job-list";
      const apiUrl = `${baseUrl}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
      
      const response = await fetch(apiUrl);
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
        className="col-12 mb-4"
        key={item.id}
      >
        <div className="job-card bg-white rounded-4 shadow-sm position-relative p-4 h-100 d-flex flex-column" style={{ minHeight: 220 }}>
          {/* Top Row: Logo, Company, Heart */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <img
                src={item.logo || "/images/resource/company-logo/1-1.png"}
                alt="company logo"
                className="rounded-circle border"
                style={{ width: 40, height: 40, objectFit: 'contain', marginRight: 12 }}
              />
              <div>
                <div className="fw-semibold font-poppins">{item.company_name}</div>
                <div className="text-muted small">{item.created_at ? `${Math.floor((Date.now() - new Date(item.created_at)) / (1000 * 60 * 60))} hours ago` : ""}</div>
              </div>
            </div>
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await savejob(item.id);
                setFilteredJobs((prevJobs) =>
                  prevJobs.map((job) =>
                    job.id === item.id
                      ? { ...job, is_favorite: !item.is_favorite }
                      : job
                  )
                );
              }}
              className="btn btn-link p-0"
              style={{ zIndex: 2 }}
              aria-label="Save Job"
            >
              {item.is_favorite ? (
                <BsHeartFill className="text-danger fs-4" />
              ) : (
                <BsHeart className="text-secondary fs-4" />
              )}
            </button>
          </div>

          {/* Job Title */}
          <div className="fs-4 fw-bold mb-2 font-poppins">{item.job_title}</div>

          {/* Location */}
          <div className="d-flex align-items-center text-muted mb-2">
            <BsGeoAlt className="me-1" />
            <span>{item.location || item.complete_address || item.city || "Location Not Specified"}</span>
          </div>

          {/* Salary & Freshers */}
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex align-items-center text-muted me-3">
              <BsBriefcase className="me-1" />
              {item.salary_min && item.salary_max ? (
                <>
                  <span className="fw-bold text-dark me-1">₹</span>
                  {item.salary_min} - {item.salary_max} / month
                </>
              ) : "Salary Not Specified"}
            </span>
            {item.freshers_can_apply && (
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 fw-normal ms-1">Freshers can apply</span>
            )}
          </div>

          {/* Tags */}
          <div className="mb-2 d-flex flex-wrap gap-2">
            {item.skills && item.skills.length > 0 && item.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="badge rounded-pill bg-light text-secondary border border-secondary border-opacity-25 fw-normal">{skill}</span>
            ))}
            {item.skills && item.skills.length > 3 && (
              <span className="badge rounded-pill bg-light text-secondary border border-secondary border-opacity-25 fw-normal">+{item.skills.length - 3} More</span>
            )}
            {item.job_type_name && Array.isArray(item.job_type_name) && item.job_type_name.map((type, idx) => (
              <span key={"type-" + idx} className="badge rounded-pill bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 fw-normal">{type}</span>
            ))}
            {item.job_category_name && item.job_category_name.length > 0 && item.job_category_name.map((cat, idx) => (
              <span key={"cat-" + idx} className="badge rounded-pill bg-light text-secondary border border-secondary border-opacity-25 fw-normal">{cat}</span>
            ))}
          </div>

          {/* Extra Info: Industry, Experience, Functional Area as badges */}
          <div className="mb-2 d-flex flex-wrap gap-2">
            {item.industry && (
              <span className="badge rounded-pill bg-info bg-opacity-10 text-info border border-info border-opacity-25 fw-normal">
                <BsBuilding className="me-1" /> {item.industry}
              </span>
            )}
            {(!item.industry) && (
              <span className="badge rounded-pill bg-light text-secondary border border-secondary border-opacity-25 fw-normal">
                <BsBuilding className="me-1" /> Industry Not Specified
              </span>
            )}
            <span className="badge rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fw-normal">
              <FiAward className="me-1" /> Experience: {item.experience_level_min_name || 'Not Specified'}{item.experience_level_max_name ? ` - ${item.experience_level_max_name}` : ''}
            </span>
            <span className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 fw-normal">
              <BsBriefcase className="me-1" /> {item.functional_area_name || 'Functional Area Not Specified'}
            </span>
          </div>

          {/* Posted Date */}
          <div className="text-muted small mb-2">
            {item.created_at ? `Posted ${new Date(item.created_at).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}` : "Posted Date Not Available"}
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end align-items-center gap-2 mt-auto">
            <Link
              to={`/job-single-v3/${item.id}`}
              className="btn btn-outline-secondary px-4 py-2 fw-semibold"
            >
              View Job
            </Link>
            <button
              onClick={() => {
                handleApplyNowClick(item.id);
                setFilteredJobs((prevJobs) =>
                  prevJobs.map((job) =>
                    job.id === item.id ? { ...job, is_applied: true } : job
                  )
                );
              }}
              className="btn btn-danger px-4 py-2 fw-semibold"
              style={{ backgroundColor: '#e51b3e', borderColor: '#e51b3e' }}
            >
              Quick Apply
            </button>
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
      <div className="row g-4">{content}</div>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-sm sm:text-base">
            Showing {content?.length} of {jobs.length} Jobs
          </p>
          <div className="w-full sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(content?.length / jobs.length) * 100}%` }}
            ></div>
          </div>
          <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
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
