import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/store/slices/service/axiosInstance";

// Import components
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import MetaComponent from "@/components/common/MetaComponent";
import FullPageLoader from "@/components/loader/FullPageLoader"
// Utility imports
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-hot-toast";
import CompanyInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import JobStepsComponent from "./JobSteps";

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

const JobSingleDynamicV3 = () => {
  const [jobData, setJobData] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionStatus, setActionStatus] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem(Constant.USER_TOKEN);

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

  const handleFollowCompany = async (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    try {
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/company-favorite`,
        {
          company_id: jobData.company_id
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(response.data.message || "Company followed successfully!");
        setIsFollowing(!isFollowing);
        // Update jobData with new company_favorite_id
        setJobData(prevData => ({
          ...prevData,
          company_favorite_id: isFollowing ? 0 : response.data.data?.company_favorite_id || 1
        }));
      } else {
        toast.error("Failed to follow company. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while following the company. Please try again.");
    }
  };

  useEffect(() => {
    const fetchJobAndCompanyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem(Constant.USER_TOKEN);

        // Use public API if user is not logged in
        const apiUrl = token 
          ? `https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`
          : `https://api.sentryspot.co.uk/api/jobseeker/public/job-list/${id}`;

        // Fetch job details
        const jobResponse = await axios.get(apiUrl, {
          headers: token ? {
            Authorization: ` ${token}`
          } : {}
        });
        const jobData = jobResponse.data.data;
        setJobData(jobData);
        // Set initial following state based on company_favorite_id
        setIsFollowing(jobData.company_favorite_id > 0);

        // If company_id exists and user is logged in, fetch company details
        if (jobData.company_id && token) {
          const companyResponse = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/companies/${jobData.company_id}`, {
            headers: {
              Authorization: ` ${token}`
            }
          });
          setCompany(companyResponse.data.data);
        }

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch details";
        console.error("Error fetching details:", error);
        toast.error(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndCompanyDetails();
  }, [id, token]);

  const handleApplyClick = (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    const modal = document.querySelector("#applyJobModal");
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  };

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.status === "status" || response.data.code === 200) {
        toast.success(response.message || "Your job was successfully saved!");
        setJobData((prevData) => ({
          ...prevData,
          is_favorite: !prevData.is_favorite,
        }));
      } else {
        toast.error("Failed to save the job. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the job. Please try again.");
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const metadata = {
    title: "Job Single Dynamic V3 || sentryspot - Job Board ReactJs Template",
    description: "Job details page with comprehensive job and company information",
  };

  if (loading) {
    return <FullPageLoader loadingText="Job details page" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>

      <LoginPopup />
      <DefaulHeader2 />

      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content">
                        <div className="flex justify-start gap-2 items-center mb-4">
                          <img
                            src={
                               "/images/resource/company-logo/1-1.png"
                            }
                            alt="Company Logo"
                            className=" w-14 h-14"
                          />
 <h4>{jobData?.job_title || "Job Title Not Available"}</h4>
                        </div>
                       

                        <ul className="job-info space-between">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            <strong>Industry:</strong> {jobData?.industry || "Industry Not Available"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            <strong>Location:</strong> {jobData?.location || "Location Not Specified"}
                          </li>
                          <li>
                            <span className="icon flaticon-clock-3"></span>
                            <strong>Posted On:</strong> {jobData?.created_at || "Date Not Available"}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>
                            <strong>Salary:</strong> {jobData?.offered_salary || "Salary Not Defined"}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>
                            <strong>Job Type:</strong> {jobData?.job_type_name || "Job Type Not Defined"}
                          </li>
                          <li>
                            <span className="icon flaticon-user"></span>
                            <strong>Experience Level:</strong> {jobData?.experience_level_min_name || "Not Specified"}
                          </li>
                          <li>
                            <span className="icon flaticon-category"></span>
                            <strong>Job Category:</strong> {jobData?.job_category_name || "Not Specified"}
                          </li>
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            <strong>Functional Area:</strong> {jobData?.functional_area_name || "Not Specified"}
                          </li>
                        </ul>


                        {jobData?.jobType && (
                          <ul className="job-other-info">
                            {jobData.jobType.map((val, i) => (
                              <li key={i} className={val.styleClass}>
                                {val.type}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="job-overview-two">
                  <JobStepsComponent />
                </div>

                <h4>Job Description</h4>
                <p dangerouslySetInnerHTML={{ __html: jobData?.job_description }} />

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="space-y-4">
                    <button
                      className="w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleApplyNowClick(jobData.id)}
                      disabled={jobData?.is_applied}
                    >
                      {jobData?.is_applied ? "Already Applied" : "Apply For Job"}
                    </button>

                    <button
                      className={`flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 w-full ${
                        jobData.is_favorite
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={handleBookmarkClick}
                    >
                      <i className="flaticon-bookmark text-xl" />
                      <span className="font-semibold">
                        {jobData.is_favorite ? "Saved" : "Unsave"}
                      </span>
                    </button>

                    <button
                      className={`flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 w-full ${
                        isFollowing
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={handleFollowCompany}
                    >
                      <i className="flaticon-user text-xl" />
                      <span className="font-semibold">
                        {isFollowing ? "Following" : "Follow Company"}
                      </span>
                    </button>
                  </div>

                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    {token && (
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="apply-modal-content modal-content">
                          <div className="text-center">
                          </div>
                          <ApplyJobModalContent jobId={jobData.id} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <CompanyInfo company={jobData.id} />
                    </div>
                  </div>

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact companyId={jobData?.company_id} />
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <div className="related-jobs">
              <div className="title-box">
                <h3>Related Jobs</h3>
                <div className="text">2020 jobs live - 293 added today.</div>
              </div>

              <div className="row">
                <RelatedJobs2 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV3;