import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import ApplyForm from "@/components/ApplyForm/ApplyForm";

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

      const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/job-list${
        urlParams.toString() ? `?${urlParams.toString()}` : ""
      }`;

      const response = await fetch(apiUrl);
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
        className="job-block col-lg-6 col-md-12 col-sm-12 hover:border-2 border-blue-400 hover:rounded-lg"
        key={item.id}
      >
        <div className="inner-box">
          <div className="content">
            <span className="company-logo">
              <img
                src={
                  item.logo ||
                  "/images/resource/company-logo/1-1.png"
                }
                alt="company logo"
              />
            </span>
            <h4>
              <Link to={`/job-single-v3/${item.id}`}>{item.job_title}</Link>
            </h4>

            <ul className="job-info">
             
              <li>
                <i className="fas fa-briefcase"></i> {item.job_type_name || "N/A"}
              </li>
              <li>
                <i className="fas fa-level-up-alt"></i>{" "}
                {item.experience_level_min_name || "N/A"}
              </li>
              <li>
                <i className="fas fa-industry"></i> {item.industry || "Not specified"}
              </li>
              <li>
                <i className="fas fa-tags"></i> {item.job_category_name || "N/A"}
              </li>
              <li>
                <i className="fas fa-cogs"></i> {item.functional_area_name || "N/A"}
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>{" "}
                {item?.location || "Location Not Specified"}
              </li>
              <li>
                <i className="fas fa-calendar-alt"></i> {item.created_at || "N/A"}
              </li>
           
            </ul>

            <ul className="job-other-info">
              {item.job_type && <li className="time">{item.job_type}</li>}
            </ul>

            <div className="flex">
              {/* Save Job Button */}
              <button
                className="btn"
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
              >
                {item.is_favorite ? (
                  <i className="fas fa-heart text-dark"></i> // Marked as favorite
                ) : (
                  <i className="far fa-heart text-blue-700"></i> // Not marked as favorite
                )}
              </button>

              {/* Apply Job Button */}
              <button
                className="btn"
                onClick={() => {
                  handleApplyNowClick(item.id);
                  setFilteredJobs((prevJobs) =>
                    prevJobs.map((job) =>
                      job.id === item.id ? { ...job, is_applied: true } : job
                    )
                  );
                }}
              >
                {item.is_applied ? (
                  <i className="far fa-bookmark text-blue-700"></i> // Marked as applied
                ) : (
                  <i className="fas fa-bookmark text-dark"></i> // Not marked as applied
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <div className="ls-switcher">
        <div className="flex bg-gray-50 mb-2 border=b justify-between items-center w-full py-4 px-4 ">
          <div className="text">
            Show <strong>{content?.length}</strong> jobs
          </div>
          <div className="flex items-center gap-2 ">
            <select
              value={sort}
              className="chosen-single form-select"
              onChange={sortHandler}
            >
              <option value="">Sort by (default)</option>
              <option value="asc">Newest</option>
              <option value="des">Oldest</option>
            </select>

            {hasFilters() && (
              <button
                onClick={clearFilters}
                className="w-full p-2 bg-red-500 text-white"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row">{content}</div>

      <div className="ls-show-more">
        <p>
          Show {content?.length} of {jobs.length} Jobs
        </p>
        <div className="bar">
          <span
            className="bar-inner"
            style={{ width: `${(content?.length / jobs.length) * 100}%` }}
          ></span>
        </div>
        <button className="show-more">Show More</button>
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
