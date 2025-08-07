import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import ApplyJobPopup from "./ApplyJobPopup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer";
import FullPageLoader from "@/components/loader/FullPageLoader";
import { Briefcase, Building, MapPin, Users } from "lucide-react";
import CompanyCard from "./CompanyCard";
import { Button } from "@/components/ui/button";

const Companieslist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobCount, setJobCount] = useState(0);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isFollowingMap, setIsFollowingMap] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem(Constant.USER_TOKEN);

        const API = token
          ? `https://api.sentryspot.co.uk/api/jobseeker/pro/companies`
          : "https://api.sentryspot.co.uk/api/jobseeker/companies";
        const response = await axios.get(`${API}`, {
          headers: {
            Authorization: token,
          },
        });
        setJobCount(response.data.data.length);
        setJobs(response.data.data);
      } catch (error) {
        setError("Failed to fetch jobs");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <FullPageLoader LoadingText="Companies listing...." />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  // Filter jobs based on search term (case-insensitive)
  const filteredJobs = jobs.filter((job) =>
    job.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleFollowCompany = async (e, company) => {
    e.preventDefault();

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const isCurrentlyFollowing = isFollowingMap[company.id] || false;

    try {
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/company-favorite`,
        {
          company_id: company.id,
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

        // Toggle follow state
        setIsFollowingMap((prev) => ({
          ...prev,
          [company.id]: !isCurrentlyFollowing,
        }));

        // Optional jobData update
        // setJobData((prevData) => ({
        //   ...prevData,
        //   company_favorite_id: !isCurrentlyFollowing
        //     ? response.data.data?.company_favorite_id || 1
        //     : 0,
        // }));
      }
    } catch (error) {
      toast.error(
        "An error occurred while following the company. Please try again."
      );
    }
  };
  const savejob = async (jobId) => {
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
        toast.success("Your job successfully Saved!");
      } else {
        toast.error("Failed to job  the job. Please try again.");
      }
    } catch (error) {
      toast.error("Error Saving  job:", error);
      toast.error(
        "An error occurred while saving for the job. Please try again."
      );
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
    <div className="app-gradient-bg min-h-screen">
      <style>
        {`
          .company-card {
            background-color: white;
            transition: all 0.3s ease;
          }
          .company-card:hover {
            background-color: #dbeafe !important;
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      <DefaulHeader2 />
      {/* Tabs */}
     
      {/* Search Bar and Sort */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 my-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full">
              <input
                type="text"
                placeholder="Search by Company Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:flex-1 px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              />
              <Button
                onClick={() => setSearchTerm(search)}
                className=" px-4 py-3 "
              >
                <i className="fas fa-search"></i>
                <span>Search Jobs</span>
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="mt-6 md:mt-0 md:ml-4 w-full md:w-auto flex justify-end">
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none">
            <option>Recently Posted</option>
            {/* Add more sort options if needed 
          </select>
        </div> */}
      </div>
      {/* Trending Companies Title */}
      <div className="max-w-7xl mx-auto px-4 pb-2">
        <h2 className="text-2xl font-bold mb-1">Trending Companies</h2>
        <p className="text-gray-500 text-lg mb-6">
          {filteredJobs.length} Companies found!
        </p>
      </div>
      {/* Company Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredJobs.map((job) => (
            <CompanyCard
              key={job.id}
              company={job}
              isFollowing={isFollowingMap[job.id] || job.is_favorite_company}
              onFollow={(e) => handleFollowCompany(e, job)}
            />
          ))}
        </div>
      </div>
      <FooterDefault />
    </div>
  );
};

export default Companieslist;
