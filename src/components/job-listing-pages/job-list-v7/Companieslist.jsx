import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import ApplyJobPopup from "./ApplyJobPopup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer"
import FullPageLoader from "@/components/loader/FullPageLoader"
import { Briefcase, Building, MapPin, Users } from "lucide-react";
const Companieslist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobCount, setJobCount] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);






  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token');
      

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/companies`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
       setJobCount(response.data.data.length);
        setJobs(response.data.data);
        
      } catch (error) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
      finally{
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <FullPageLoader LoadingText="Companies 
    listing...." />
  }

  if (error) {
    return <p>{error}</p>;
  }


  const savejob = async(jobId)=>{
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
       
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Your job successfully Saved!');
      } else {
        toast.error('Failed to job  the job. Please try again.');
      }
    } catch (error) {
      toast.error('Error Saving  job:', error);
      toast.error('An error occurred while saving for the job. Please try again.');
    }
  };
  



  const handleApplyNowClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
console.log(jobs,"jobs");
  return (
    <div className="">
    {/* Sidebar */}
    <DefaulHeader2 />
    {/* Job List */}
    <main className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-5 my-3">
        <p className="text-base md:text-lg text-gray-800 mb-4">
          Show {jobCount} {jobCount === 1 ? 'Job' : 'Jobs'}
        </p>
      </div>
  
      {/* <ul className="px-4 lg:px-16">
        {jobs.map((job) => (
          <div className="job-block-four mb-6" key={job.id}>
            <div className="inner-box flex flex-col md:flex-row text-start p-4 bg-white shadow-md rounded-lg">
              <div className="relative flex-shrink-0 mb-4 md:mb-0">
                <img
                  src={
                    job.logo ||
                    "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1717372800&semt=ais_user"
                  }
                  alt="featured job"
                  className="rounded-xl border-2 p-1 h-20 w-20 bg-black"
                />
              </div>
              <div className="flex-1 md:ml-4">
                <h4 className="text-lg font-medium flex justify-between w-full">
                  <Link to={`/employers-single-v1/${job.id}`}>{job.company_name}</Link>
                </h4>
  
                {showPopup && (
                  <ApplyJobPopup jobId={job.id} token={token} onClose={handleClosePopup} />
                )}
  
                <div className="location mt-2">
                  <span className="icon flaticon-briefcase"></span>
                  {job.company_industry.name}{" "}|
                </div>
                {" "}{" "}
                <div className="location mt-2">
                  <span className="icon flaticon-map-locator"></span>
                  {job.city.name} , {job.state.name},  {job.country.name}
                </div>
  
                <div className="flex mt-2">
                  <ul className="post-tags text-start flex flex-wrap gap-2">
                    <li className="border p-1 rounded">
                      <a href="#">Company Type: {job.company_type.name || "software"}</a>
                    </li>
                    <li className="border p-1 rounded">
                      <a href="#">Company Size: {job.company_size.range}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul> */}
       <div className="w-full max-w-6xl mx-auto">
      <ul className="px-4 lg:px-6 space-y-6">
        {jobs.map((job) => (
          <li key={job.id} className="transition-all duration-300 hover:shadow-lg">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:border-blue-200">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-100">
                      <img
                        src={job.logo || "/api/placeholder/120/120"}
                        alt={`${job.company_name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Job Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800 truncate">
                        <a 
                          href={`/employers-single-v1/${job.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {job.company_name}
                        </a>
                      </h3>
                      
                      {/* <button 
                        onClick={() => handleApplyNowClick(job.id)}
                        className="mt-2 md:mt-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Apply Now
                      </button> */}
                    </div>
                    
                    {/* Company Industry */}
                    <div className="flex items-center text-gray-600 mb-2">
                      <Briefcase size={16} className="mr-2 text-blue-500" />
                      <span>{job.company_industry?.name || "Industry not specified"}</span>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={16} className="mr-2 text-blue-500" />
                      <span>
                        {job.city?.name || "City"}, {job.state?.name || "State"}, {job.country?.name || "Country"}
                      </span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs">
                        <Building size={12} className="mr-1" />
                        {job.company_type?.name || "Unknown"}
                      </div>
                      
                      <div className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs">
                        <Users size={12} className="mr-1" />
                        {job.company_size?.range || "Unknown size"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {showPopup && selectedJobId && (
        <ApplyJobPopup 
          jobId={selectedJobId} 
          token={token} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
    </main>
    <FooterDefault />
  </div>
  
  );
};


export default Companieslist;
