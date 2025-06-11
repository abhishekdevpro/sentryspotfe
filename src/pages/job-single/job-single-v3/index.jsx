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
  const [activeTab, setActiveTab] = useState("description");

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

        // Always use public API for job details
        const apiUrl = `https://api.sentryspot.co.uk/api/jobseeker/public/job-list/${id}`;

        // Fetch job details
        const jobResponse = await axios.get(apiUrl);
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

      {/* Header Section */}
      <div className="container px-4 sm:px-6">
        <section className="job-header-section bg-[#f8ecd7] py-4 sm:py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg mb-6 shadow-sm gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <img
              src={"/images/resource/company-logo/1-1.png"}
              alt="Company Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 border-white shadow-sm"
            />
            <div className="w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{jobData?.job_title || "Job Title Not Available"}</h2>
              <div className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                <i className="flaticon-building text-[#e63946]" />
                {jobData?.company_name || "Company Not Available"}
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <i className="flaticon-briefcase text-[#e63946]" />
                  Full Time
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <i className="flaticon-money text-[#e63946]" />
                  ₹{jobData?.offered_salary || "-"} / month
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <i className="flaticon-map-locator text-[#e63946]" />
                  {jobData?.location || "Location Not Specified"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-stretch sm:items-end w-full sm:w-auto">
            <button
              className="bg-[#e63946] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-[#d62839] w-full flex items-center justify-center gap-2 shadow-sm"
              onClick={() => handleApplyNowClick(jobData.id)}
              disabled={jobData?.is_applied}
            >
              <i className="flaticon-send text-lg" />
              <span>{jobData?.is_applied ? "Already Applied" : "Apply For Job"}</span>
            </button>
            <div className="flex gap-3 w-full">
              <button
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-white rounded-lg transition w-1/2 shadow-sm ${
                  jobData.is_favorite ? "bg-green-500 hover:bg-green-600" : "bg-[#e63946] hover:bg-[#d62839]"
                }`}
                onClick={handleBookmarkClick}
              >
                <i className="flaticon-bookmark text-lg" />
                <span className="font-medium text-sm sm:text-base">{jobData.is_favorite ? "Saved" : "Save"}</span>
              </button>
              <button
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-white rounded-lg transition w-1/2 shadow-sm ${
                  isFollowing ? "bg-green-500 hover:bg-green-600" : "bg-[#e63946] hover:bg-[#d62839]"
                }`}
                onClick={handleFollowCompany}
              >
                <i className="flaticon-user text-lg" />
                <span className="font-medium text-sm sm:text-base">{isFollowing ? "Following" : "Follow"}</span>
              </button>
            </div>
            <div className="mt-2">
              <SocialTwo />
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar (Left Column) */}
          <aside className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* About this role */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800">
                <i className="flaticon-calendar text-[#e63946] text-lg" />
                About this role
              </h4>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-2">
                  <i className="flaticon-calendar-1 text-[#e63946]" />
                  Job Posted On
                </span>
                <span className="font-medium">{jobData?.created_at ? new Date(jobData.created_at).toLocaleDateString() : "-"}</span>
              </div>
            </div>
            {/* Required Skills */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800">
                <i className="flaticon-skills text-[#e63946] text-lg" />
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {(jobData?.skills || ["Administration", "Budgeting", "Customer Relationship Management (CRM)", "Office Administration", "Office Management"]).map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 flex items-center gap-1">
                    <i className="flaticon-check text-xs text-green-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Education */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800">
                <i className="flaticon-graduation-cap text-[#e63946] text-lg" />
                Education
              </h4>
              <div className="text-sm text-gray-700 flex items-center gap-2">
                <i className="flaticon-graduation-cap text-[#e63946]" />
                {jobData?.education || "10th Class"}
              </div>
            </div>
            {/* Location */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800">
                <i className="flaticon-map-locator text-[#e63946] text-lg" />
                Location
              </h4>
              <div className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                <i className="flaticon-map-locator text-[#e63946]" />
                {jobData?.location || "Medak Road, Gandi Maisamma, Hyderabad, Telangana, India"}
              </div>
              {/* Google Maps Embed */}
              {jobData?.location ? (
                <iframe
                  title="map"
                  className="rounded-lg overflow-hidden border h-32 w-full"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(jobData.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="rounded-lg overflow-hidden border h-32 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">Map Not Available</div>
              )}
            </div>
            {/* Perks and Benefits */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800">
                <i className="flaticon-gift text-[#e63946] text-lg" />
                Perks and Benefits
              </h4>
              <div className="flex flex-wrap gap-2">
                {(jobData?.perks || ["Safe Transportation", "Employee Provident Fund", "Employees Allowance", "Meals", "Perks And Bonus"]).map((perk, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 flex items-center gap-1">
                    <i className="flaticon-gift text-xs text-pink-400" />
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content (Right Column) */}
          <main className="w-full lg:w-2/3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <div className="flex border-b mb-4 overflow-x-auto">
                <button
                  className={`px-4 py-2 font-semibold focus:outline-none whitespace-nowrap ${activeTab === "description" ? "border-b-2 border-red-500 text-red-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("description")}
                >
                  Job Description
                </button>
                <button
                  className={`px-4 py-2 font-semibold focus:outline-none whitespace-nowrap ${activeTab === "company" ? "border-b-2 border-red-500 text-red-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("company")}
                >
                  About the company
                </button>
              </div>
              {/* Tab Content */}
              {activeTab === "description" && (
                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 text-gray-800">Job Description</h4>
                  <div className="text-gray-700 text-sm mb-4" dangerouslySetInnerHTML={{ __html: jobData?.job_description }} />
                </div>
              )}
              {activeTab === "company" && (
                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-800">
                    <i className="flaticon-briefcase text-[#e63946] text-lg" />
                    About the company
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 mb-3 sm:mb-4">
                    <img src={"/images/resource/company-logo/1-1.png"} alt="Company Logo" className="w-12 h-12 rounded-lg border" />
                    <div className="min-w-[150px]">
                      <div className="font-semibold flex items-center gap-2 text-gray-800">
                        <i className="flaticon-building text-[#e63946]" />
                        {jobData?.company_name || "Schneider Electrical"}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                        <i className="flaticon-industry text-[#e63946]" />
                        {company?.industry || "Manufacturing"} &bull; {company?.size || "700-1000 employees"}
                      </div>
                      {company?.website && (
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline flex items-center gap-2 mt-1">
                          <i className="flaticon-link text-[#e63946]" />
                          {company.website}
                        </a>
                      )}
                    </div>
                    <button className="ml-auto bg-black text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 text-sm">Explore More</button>
                  </div>
                  <div className="text-gray-700 text-sm mb-3 sm:mb-4">
                    {company?.description || "Our mission is to be the trusted partner in Sustainability and Efficiency. We are a global industrial technology leader bringing world-leading expertise in electrification, automation and digitization to smart industries, resilient infrastructure, future-proof data centers, intelligent buildings, and intuitive homes. Anchored by our deep domain expertise, we provide integrated end-..."}
                  </div>
                  {company?.address && (
                    <div className="text-xs text-gray-600 mb-2 flex items-center gap-2">
                      <i className="flaticon-map-locator text-[#e63946]" />
                      Address: {company.address}
                    </div>
                  )}
                  {company?.contact_email && (
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <i className="flaticon-mail text-[#e63946]" />
                      Email: {company.contact_email}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Related Jobs Section */}
        <div className="mt-8 px-0">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Related Jobs</h3>
              <div className="text-gray-500 text-sm">2020 jobs live - 293 added today.</div>
            </div>
            <RelatedJobs2 />
          </div>
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV3;