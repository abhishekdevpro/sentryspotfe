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
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
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
    return <FullPageLoader LoadingText="Companies listing...." />
  }
  if (error) {
    return <p>{error}</p>;
  }

  // Filter jobs based on search term (case-insensitive)
  const filteredJobs = jobs.filter(job =>
    job.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  
  const handleApplyNowClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      <DefaulHeader2 />
      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex space-x-10 border-b border-gray-200">
          <button className="pb-3 border-b-4 border-[#f43f5e] text-[#f43f5e] font-semibold text-lg">Trending</button>
          <button className="pb-3 text-gray-500 font-semibold text-lg hover:text-[#f43f5e]">Following</button>
          <button className="pb-3 text-gray-500 font-semibold text-lg hover:text-[#f43f5e]">Industry</button>
        </div>
      </div>
      {/* Search Bar and Sort */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-8">
        <div className="w-full md:w-3/4 flex">
          <input
            type="text"
            placeholder="Company Name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-xl border border-gray-200 bg-white focus:outline-none text-base shadow-sm"
          />
          <button
            className="bg-[#f43f5e] text-white px-5 py-2 rounded-r-xl flex items-center text-base font-semibold shadow-sm"
            onClick={() => setSearchTerm(search)}
          >
            <i className="fas fa-search mr-2"></i> Search Jobs
          </button>
        </div>
        <div className="mt-6 md:mt-0 md:ml-4 w-full md:w-auto flex justify-end">
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none">
            <option>Recently Posted</option>
            {/* Add more sort options if needed */}
          </select>
        </div>
      </div>
      {/* Trending Companies Title */}
      <div className="max-w-7xl mx-auto px-4 pb-2">
        <h2 className="text-2xl font-bold mb-1">Trending Companies</h2>
        <p className="text-gray-500 text-lg mb-6">{filteredJobs.length} Companies found!</p>
      </div>
      {/* Company Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl shadow flex flex-col items-center text-center py-8 px-4 min-h-[230px] transition-all duration-200 hover:shadow-lg">
              <img
                src={job.logo || "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg"}
                alt={job.company_name}
                className="w-16 h-16 object-contain mb-4 rounded"
                onError={e => { e.target.onerror = null; e.target.src = "https://img.freepik.com/premium-photo/intelligent-logo-simple_553012-47516.jpg?size=338&ext=jpg"; }}
              />
              <div className="font-semibold text-lg mb-2 min-h-[48px] flex items-center justify-center text-center w-full">
                {job.company_name}
              </div>
              <Link
                to={`/employers-single-v1/${job.id}`}
                className="text-[#f43f5e] font-bold text-lg mt-2 hover:underline"
              >
              View company
              </Link>
            </div>
          ))}
        </div>
      </div>
      <FooterDefault />
    </div>
  );
};

export default Companieslist;
