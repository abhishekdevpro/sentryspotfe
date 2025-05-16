import { useEffect, useState } from "react";
import jobs from "@/data/job-featured";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "@/components/job-single-pages/job-overview/JobOverView";
import JobSkills from "@/components/job-single-pages/shared-components/JobSkills";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import MapJobFinder from "@/components/job-listing-pages/components/MapJobFinder";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import { Link, useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import DefaulHeader2 from "@/components/header/DefaulHeader2";

const metadata = {
  title: "Job Single Dynamic V1 || sentryspot - Job Board ReactJs Template",
  description: "sentryspot - Job Board ReactJs Template",
};

const JobSingleDynamicV1 = () => {

  const token = localStorage.getItem('token');

  const [jobData, setJobData] = useState(null);
  let params = useParams();
  const id = params.id;

  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(null);

  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from API
    const fetchJobData = async () => {
      try {
        const response = await fetch(`https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJobData(data);
          if (data?.data?.job_title) {
            fetchRelatedJobs(data.data.job_title);
          }
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    const fetchRelatedJobs = async (jobTitle) => {
      try {
        const response = await fetch(`https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${jobTitle}`);
        if (response.ok) {
          const relatedJobsData = await response.json();
          setRelatedJobs(relatedJobsData.data);
        } else {
          console.error("Failed to fetch related jobs");
        }
      } catch (error) {
        console.error("Error fetching related jobs:", error);
      }
    };

   

    fetchJobData();
  }, [id]);

  // If data is not loaded yet, you can show a loading spinner or message
  if (!jobData) {
    return <div>Loading...</div>;
  }

  const company = jobData.data || jobs[0]; // Update with fetched data or fallback

  const applyForJob = async () => {
    setIsApplying(true);
    try {
      const response = await fetch(`https://api.sentryspot.co.uk/api/jobseeker/apply-for-job/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any authorization token if required
          "Authorization": token, 
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // Handle success response
        const data = await response.json();
        setApplySuccess(true);
        alert("Successfully applied for the job!");
      } else {
        // Handle error response
        setApplySuccess(false);
        alert("Failed to apply for the job. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      setApplySuccess(false);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsApplying(false);
    }
  };

  
  return (
    <>
      <MetaComponent meta={metadata} />
      

      <LoginPopup />
      <DefaulHeader2 />
      {/* End Header */}

      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={company?.logo || "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1717372800&semt=ais_user"} alt="logo" />
                  </span>
                  <h4>{company?.job_title}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {company?.industry}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {company?.city}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {company?.time}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {company?.offered_salary}
                    </li>
                  </ul>

                  <ul className="job-other-info">
                    {company?.jobType?.map((val, i) => (
                      <li key={i} className={`${val.styleClass}`}>
                        {val.type}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
          <button
            className="theme-btn btn-style-one"
            onClick={applyForJob}
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply For Job"}
          </button>
          <button className="bookmark-btn">
            <i className="flaticon-bookmark"></i>
          </button>
        </div>

                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <button
                          className="theme-btn btn-style-one w-100"
                          type="submit"
                          name="submit-form"
                        >
                          Apply Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <JobDetailsDescriptions company={company} />
                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                   
                  </div>

                  
          {relatedJobs.length > 0 ? (
            relatedJobs.map((item) => (
              <div className="job-block" key={item.id}>
                <div className="inner-box">
                  <div className="content">
                    <span className="company-logo">
                      <img src={item.logo || "https://via.placeholder.com/150"} alt="item brand" />
                    </span>
                    <h4>
                      <Link to={`/job-single-v1/${item.id}`}>{item.name}</Link>
                    </h4>

                    <ul className="job-info">
                      <li>
                        <span className="icon flaticon-briefcase"></span>
                        {item.company}
                      </li>
                      <li>
                        <span className="icon flaticon-map-locator"></span>
                        {item.city}
                      </li>
                      <li>
                        <span className="icon flaticon-clock-3"></span> {item.time}
                      </li>
                      <li>
                        <span className="icon flaticon-money"></span> {item.offered_salary}
                      </li>
                    </ul>

                    <button className="bookmark-btn">
                      <span className="flaticon-bookmark"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No related jobs found.</div>
          )}      
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <h4 className="widget-title">Job Overview</h4>
                    <JobOverView company={company} />

                    <h4 className="widget-title mt-5">Job Location</h4>
                    <div className="widget-content">
                      <div className="map-outer">
                        <div style={{ height: "300px", width: "100%" }}>
                          <MapJobFinder />
                        </div>
                      </div>
                    </div>

                    <h4 className="widget-title">Job Skills</h4>
                    <div className="widget-content">
                      <JobSkills />
                    </div>
                  </div>

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <img src={company.logo} alt="resource" />
                        </div>
                        <h5 className="company-name">{company.company}</h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>
                      <CompnayInfo />

                      <div className="btn-box">
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {company?.link}
                        </a>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV1;
