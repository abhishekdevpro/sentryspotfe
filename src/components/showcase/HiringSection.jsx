import React, { useState, useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { Constant } from "@/utils/constant/constant";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import JobCard from "../job-listing-pages/job-list-v3/JobCard";
import toast from "react-hot-toast";
import CompanyCard from "../ui/CompanyCard";
import axios from "axios";
const JobListings = ({ companyData }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/job-list?company_id=${companyData?.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setJobs(data?.data || []); // Set the job array, default to an empty array
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, [token]);

  console.log(jobs, "jobs huu bhai");

  return (
    <section className="" id="join-us">
      <CompanyCard>
        <div className="flex justify-center">
          <div className="w-full app-light-bg flex flex-col items-center justify-center p-0">
            <div className="py-2 md:p-6 flex flex-col gap-4 w-full md:w-4/5 justify-center">
              <p className="app-text-h1 text-center">
                Come, join us!{" "}
                <span className="app-text-h1 !text-blue-800">
                  We're hiring.
                </span>
              </p>

              {companyData.join_us && (
                <p
                  className="app-text-p text-center"
                  // dangerouslySetInnerHTML={{ __html: sanitizeHtml(companyData.join_us) }}
                >
                  {parse(companyData?.join_us)}
                </p>
              )}

              {/* <div className="flex justify-center gap-3">
                <button 
                  onClick={() => setFilter('ALL')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    filter === 'ALL' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ALL
                </button>
                <button 
                  onClick={() => setFilter(companyData.company_industry.name)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    filter === companyData.company_industry.name 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {companyData.company_industry.name.toUpperCase()}
                </button>
              </div> */}
            </div>

            <div className="w-full">
              {loading ? (
                <div className="flex justify-center p-8">
                  <p className="text-gray-500">Loading job listings...</p>
                </div>
              ) : jobs?.length === 0 ? (
                <div className="flex justify-center p-8">
                  <p className="text-gray-500">No jobs posted yet.</p>
                </div>
              ) : (
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 items-center justify-center">
                    {jobs.map((job, index) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        // onSaveJob={() => saveJob(job.id)}
                        onApplyJob={() => applyToJob(job.id)}
                        // actionStatus={actionStatus}
                        showApplyButton={false}
                        showSaveButton={false}
                      />
                    ))}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </CompanyCard>
    </section>
  );
};

export default JobListings;
