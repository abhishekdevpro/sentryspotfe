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
import FullPageLoader from "@/components/loader/FullPageLoader";
// Utility imports
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-hot-toast";
import CompanyInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import JobStepsComponent from "./JobSteps";
import ShareJobModal from "./ShareJobModal";
import { Briefcase, Building, CalendarRange, CheckCircle, DollarSign, Folder, GraduationCap, Heart, MapPin, Share, Share2Icon } from "lucide-react";
import { formatDaysAgo } from "@/components/common/DateUtils";
import { LoginModal } from "@/components/ui/LoginModal";
import { Button } from "@/components/ui/button";
// import {parse} from "react-html-parser";
import parse from "html-react-parser"


const JobSingleDynamicV3 = () => {
  const [jobData, setJobData] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionStatus, setActionStatus] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const handleApplyNowClick = (job) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    } console.log(job,"from apply function")

    setActionStatus((prev) => ({ ...prev, [job.id]: "applying" })); // Set status to "applying"
    if(job.is_on_demand ===true){
      navigate(`interview/${job.id}/?on_demand=true`);
    }
    else navigate(`/apply/${job.id}`);
    // setSelectedJobId(job.id);
    setShowPopup(true);

    setActionStatus((prev) => ({ ...prev, [job.id]: "applied" })); // Set status to "applied"
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
          company_id: jobData.company_id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(
          response.data.message || "Company followed successfully!"
        );
        setIsFollowing((prev) => !prev);
        // Update jobData with new company_favorite_id
        setJobData((prevData) => ({
          ...prevData,
          is_company_favorite: !prevData.is_company_favorite,
          company_favorite_id: !prevData.is_company_favorite
            ? response.data.data?.company_favorite_id || 1
            : 0,
        }));
      } else {
        toast.error("Failed to follow company. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while following the company. Please try again."
      );
    }
  };

  useEffect(() => {
    const fetchJobAndCompanyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem(Constant.USER_TOKEN);

        // Always use public API for job details
        const apiUrl = token
          ? `https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`
          : `https://api.sentryspot.co.uk/api/jobseeker/public/job-list/${id}`;

        // Fetch job details
        const jobResponse = await axios.get(apiUrl, {
          headers: {
            Authorization: token ? ` ${token}` : "",
          },
        });
        const jobData = jobResponse.data.data;
        setJobData(jobData);
        // Set initial following state based on company_favorite_id
        setIsFollowing(jobData.company_favorite_id > 0);

        // If company_id exists and user is logged in, fetch company details
        if (jobData.company_id) {
          const companyResponse = await axios.get(
            `https://api.sentryspot.co.uk/api/jobseeker/companies/${jobData.company_id}`,
            {
              headers: {
                Authorization: ` ${token}`,
              },
            }
          );
          setCompany(companyResponse.data.data);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch details";
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
    description:
      "Job details page with comprehensive job and company information",
  };

  if (loading) {
    return <FullPageLoader loadingText="Job details page" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const shareUrl = `https://sentryspot.co.uk/job-single-v3/${id}`;
  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>
      <LoginPopup />
      <DefaulHeader2 />

      {/* Header Section */}
      <div className="app-gradient-bg px-2 py-4 md:px-4 ">
        <div className="max-w-7xl mx-auto">
          <section className="job-header-section bg-blue-50 py-4 sm:py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg mb-6 shadow-sm gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row justify-center md:justify-start md:items-center gap-4 sm:gap-6 w-full sm:w-auto ">
            <img
              src={"/images/resource/company-logo/1-1.png"}
              alt="Company Logo"
              className="w-28 h-28 rounded-lg border-2 border-white shadow-sm"
            />
            <div className="w-full sm:w-auto ">
              <h2 className="app-text-h2 mb-2">
                {jobData?.job_title}
              </h2>
              <div className="font-normal gap-2 flex flex-col md:flex-row items-center">
                <div className="app-text-h3 flex  justify-start items-start ">
                 <Building className="mr-2" size={20}/>
                  {company?.company_name || "Company Not Available"}
                </div>
                
                <div className="app-text-h3 flex justify-center items-center">
                  <Folder className="mr-2" size={20} />
                  {jobData?.job_category_name || "Category"}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-sm font-normal">
                <span className="app-text-h3 flex justify-center items-center">
                  {/* <i className="flaticon-briefcase " /> */}
                  <Briefcase className="mr-2" size={20}/>
                  {jobData?.job_type_name || "Not Specified"}
                </span>
                <span className="app-text-h3 flex justify-center items-center">
                  {/* <i className="flaticon-money " /> */}
                  <DollarSign className="mr-2" size={20}/>
                  {jobData?.offered_salary
                    ? `₹${jobData.offered_salary} / month`
                    : "Not disclosed"}
                </span>
                <span className="app-text-h3 flex justify-center items-center ">
                  
                  <MapPin className="mr-2" size={20}/>
                  {jobData?.location || "Location Not Specified"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-stretch sm:items-end w-full sm:w-auto">
            {/* Apply Button */}
            <Button
            variant={jobData?.is_applied ? "success" : "default"}
              onClick={() => handleApplyNowClick(jobData)}
              className="w-full"
              disabled={jobData?.is_applied}
            >
              <i className="flaticon-send text-lg" />
              <span>
                {jobData?.is_applied ? "Already Applied" : "Apply For Job"}
              </span>
            </Button>
            <Button 
            onClick={()=>navigate(`/interview/${jobData.id}`)}
             className="w-full"
            >
              Practice Interview
            </Button>

            {/* Bookmark + Follow + Share */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Bookmark Button */}
              <Button
              variant={jobData?.is_favorite ? "destructive" : "secondary"}
               
                onClick={handleBookmarkClick}
              >
               <Heart size={16} />
                <span>{jobData.is_favorite ? "Saved" : "Save"}</span>
              </Button>

              {/* Follow Company Button */}
              <Button
              variant={jobData?.is_company_favorite ? "success" : "secondary"}
                onClick={handleFollowCompany}
              >
                <i className="flaticon-user text-lg" />
                <span>
                  {jobData.is_company_favorite ? "Following" : "Follow"}
                </span>
              </Button>

              {/* Share Button */}
              <Button
              variant="primary"
                // className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-sm transition"
                onClick={() => setShowModal(true)}
              >
                <Share2Icon size={20} />
              </Button>
            </div>

            {/* Modal */}
            {showModal && (
              <ShareJobModal
                show={showModal}
                onClose={() => setShowModal(false)}
                shareUrl={shareUrl}
              />
            )}
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar (Left Column) */}
          <aside className="w-full lg:w-1/3 bg-blue-50 rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* About this role */}
            <div className=" border-b border-gray-200 pb-2 mb-2">
              <h4 className="app-text-h2 text-center">
                <i className="flaticon-calendar  text-lg" />
                About this role
              </h4>
            </div>
            <div className="flex justify-between text-sm  mb-2">
                <span className="app-text-h6 flex justify-center items-center">
                  {/* <i className="flaticon-calendar-1 " /> */}
                  <CalendarRange className="mr-2" size={20}/>
                  Job Posted On
                </span>
                <span className="app-text-p">
                    {formatDaysAgo(jobData?.created_at)}
                </span>
              </div>
            {/* Required Skills */}
            <div>
              <h4 className="app-text-h6 flex items-center mb-2">
                {/* <i className="flaticon-skills  text-lg" /> */}
                <CheckCircle className="mr-2" size={20} />
                 Required Skills
              </h4>
              <div className="app-text-p">
                {jobData?.skills && jobData.skills.length > 0 ? (
                  jobData?.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-3 py-1 rounded-full text-xs font-normal border border-gray-200 flex items-center gap-1"
                    >
                      <i className="flaticon-check text-xs text-green-500" />
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="app-text-p px-3">No Skills Specified</span>
                )}
              </div>
            </div>
            {/* Education */}
            <div>
              <h4 className="app-text-h6 flex items-center gap-2 mb-2">
              <GraduationCap className="mr-2" size={20} />
                Education
              </h4>
              <div className="app-text-p flex items-center gap-2 px-3">
                <i className="flaticon-graduation-cap " />
                {jobData?.qualification || "Not specified"}
              </div>
            </div>
            {/* Location */}
            <div className="flex flex-col gap-2">
              <div>
                <h4 className="app-text-h6 flex items-center gap-2 mb-2 ">
                {/* <i className="flaticon-map-locator  text-lg" /> */}
                <MapPin size={20} />
                Location
              </h4>
              <div className="app-text-p px-3">
                {/* <i className="flaticon-map-locator " /> */}
                {jobData?.location || "Location Not Specified"}
              </div>
              </div>
              {/* Google Maps Embed */}
              {jobData?.location ? (
                <iframe
                  title="map"
                  className="rounded-lg overflow-hidden border h-32 w-full"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    jobData.location
                  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="app-text-p">
                  Map Not Available
                </div>
              )}
            </div>
           

          </aside>

          {/* Main Content (Right Column) */}
          <main className="w-full ">
            {/* Tabs */}
            <div className="bg-blue-50 rounded-lg shadow p-4 sm:p-6 mb-6 ">
              <div className="flex flex-row gap-4 items-start mb-4 overflow-x-auto  ">
                <button
                  className={`app-text-h3 md:app-text-p ${
                    activeTab === "description"
                      ? "border-b-2 border-blue-500 text-blue-900"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Job Description
                </button>
                <button
                  className={`app-text-h3 md:app-text-p ${
                    activeTab === "company"
                      ? "border-b-2 border-blue-500 text-blue-900"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("company")}
                >
                  About the company
                </button>
              </div>
              {/* Tab Content */}
              {activeTab === "description" && (
                <div
                  className="max-h-[70vh] overflow-y-auto pr-2"
                  // style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
                >
                  {/* <h4 className="app-text-h6">
                    Job Description
                  </h4> */}
                  <div
                    className="app-text-p"
                    dangerouslySetInnerHTML={{
                      __html: jobData?.job_description,
                    }}
                  />
                </div>
              )}
              {activeTab === "company" && (
                <div className="h-[70vh] overflow-y-auto pr-2">
                  
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-3 sm:mb-4">
                    <div className="flex gap-4 items-center">
                      <img
                      src={"/images/resource/company-logo/1-1.png"}
                      alt="Company Logo"
                      className="w-20 h-20 rounded-lg border"
                    />
                    <div className="min-w-[150px]">
                      <div className="app-text-h6">
                        <i className="flaticon-building " />
                        {company?.company_name || "N.A"}
                      </div>
                      <div className="app-text-h6">
                        <i className="flaticon-industry" />
                        {company?.company_industry?.name || "Manufacturing"} &bull;{" "}
                        {company?.size || "700-1000 employees"}
                      </div>
                      {company?.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm font-normal underline flex items-center gap-2 mt-1"
                        >
                          <i className="flaticon-link " />
                          {company.website}
                        </a>
                      )}
                    </div>
                    </div>
                    <Button
                    variant="primary"
                      onClick={() =>
                        navigate(`/showcase-company/${jobData.company_id}`)
                      }
                      // className="text-end"
                    >
                      Explore More
                    </Button>
                  </div>
                  <div className="font-normal text-sm mb-3 sm:mb-4">
                    {parse(company?.summery) || "Description Not Specified"}
                     {/* dangerouslySetInnerHTML={{ 
                                      __html: DOMPurify.sanitize(companyData.summery) 
                                    }}
                     */}
                  </div>
                  {company?.address && (
                    <div className="text-xs  mb-2 flex items-center gap-2">
                      <i className="flaticon-map-locator " />
                      Address: {company.address}
                    </div>
                  )}
                  {company?.contact_email && (
                    <div className="text-xs  flex items-center gap-2">
                      <i className="flaticon-mail " />
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
          <div className="bg-blue-50 rounded-lg shadow p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="app-text-h3">
                Related Jobs
              </h3>
              <div className="app-text-h6">
                2020 jobs live - 293 added today.
              </div>
            </div>
            <RelatedJobs2 />
          </div>
        </div>
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV3;
