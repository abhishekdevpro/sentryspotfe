import React, { useState, useEffect } from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import { Constant } from '@/utils/constant/constant';
import { useNavigate } from 'react-router-dom';

const JobListings = ({ companyData }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');
 const token = localStorage.getItem(Constant.USER_TOKEN)
 const navigate = useNavigate()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
            headers: {
              Authorization: token,
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch job listings");
          }
  
          const result = await response.json();
          setJobs(result.data || []); // Set the job array, default to an empty array
          setLoading(false);
        } catch (error) {
          setError(true);
        setLoading(false);
          toast.error(error.message || "Something went wrong");
        }
      };
  
      fetchData();
    }, [token]);

  // Filter jobs based on selected category
//   const filteredJobs = filter === 'ALL' 
//     ? jobs 
//     : jobs.filter(job => job.industry === companyData.company_industry.name);

  // Sample job if none are available
//   const sampleJob = {
//     title: `${companyData.company_industry.name} Engineer`,
//     experience: `${companyData.founded_date} years`,
//     location: `${companyData.city?.name || 'City'}, ${companyData.state?.name || 'State'}`
//   };

  // Use sample job if no jobs available for demo purposes
//   const displayJobs = filteredJobs.length > 0 ? filteredJobs : [sampleJob];

  const sanitizeHtml = (html) => {
    // Basic sanitization - in production use a proper library like DOMPurify
    return html ? html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') : '';
  };

  console.log(jobs,"jobs huu bhai");

  return (
    <section className="bg-gray-50 py-12" id="join-us">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full bg-white rounded-lg shadow-sm flex flex-col items-center justify-center p-0">
            <div className="p-6 flex flex-col gap-4 w-full md:w-4/5 justify-center">
              <p className="text-xl sm:text-3xl font-bold text-black text-center mt-3">
                Come, join us!{" "}
                <span className="text-blue-700">We're hiring.</span>
              </p>
              
              {companyData.join_us && (
                <p 
                  className="text-md sm:text-lg font-medium text-gray-700 text-center mb-4"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(companyData.join_us) }}
                ></p>
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
            
            <div className="w-full border-t">
              {loading ? (
                <div className="flex justify-center p-8">
                  <p className="text-gray-500">Loading job listings...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center p-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="w-full">
                  {jobs?.map((job, index) => (
                    <div 
                      key={job.job_detail.id || index} 
                      className="border-b last:border-b-0 w-full flex justify-center py-5 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-11/12 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col gap-3">
                          <p className="text-md sm:text-lg font-semibold text-black">
                             {job.job_detail.job_title }
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                            <span className="flex gap-2 items-center text-gray-600">
                              <span className="text-gray-500">
                                <IoBagHandleOutline />
                              </span>
                              <span>{job.job_detail.experience || `${companyData.founded_date} years`}</span>
                            </span>
                            <span className="flex gap-2 items-center text-gray-600">
                              <span className="text-gray-500">
                                <CiLocationOn />
                              </span>
                              <span>{job.job_detail.location || `${companyData.city?.name || 'City'}, ${companyData.state?.name || 'State'}`}</span>
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <button 
                            className="border border-amber-300 bg-amber-50 p-1 px-4 font-medium text-amber-800 rounded-md text-md hover:bg-amber-100 transition-colors"
                            onClick={() => navigate('/employers-list-v2')}
                          >
                            View Job
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListings;