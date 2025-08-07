
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";

import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer";
import FullPageLoader from "@/components/loader/FullPageLoader";
import CompanyCard from "./CompanyCard";
import { Search } from "lucide-react";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";

const Companieslist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobCount, setJobCount] = useState(0);
  const [search, setSearch] = useState("");
  const [isFollowingMap, setIsFollowingMap] = useState({});

  const token = localStorage.getItem(Constant.USER_TOKEN);

  const fetchCompanies = async (searchValue = "") => {
    setLoading(true);
    try {
      const API = token
        ? `https://api.sentryspot.co.uk/api/jobseeker/pro/companies`
        : "https://api.sentryspot.co.uk/api/jobseeker/companies";

      const response = await axios.get(API, {
        headers: {
          Authorization: token,
        },
        params: {
          title_keywords: searchValue || undefined,
        },
      });

      setJobs(response.data.data || []);
      setJobCount(response.data.data.length || 0);
    } catch (err) {
      console.log(er)
      // setError("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  // Debounce the fetchCompanies call
  const debouncedFetch = useCallback(
    debounce((value) => {
      fetchCompanies(value);
    }, 500),
    [token]
  );

  // Initial fetch
  useEffect(() => {
    fetchCompanies();
  }, [token]);

  // Debounced search call
  useEffect(() => {
    if (search.trim() !== "") {
      debouncedFetch(search);
    } else {
      fetchCompanies(); // reset to full list when input is cleared
    }
  }, [search, debouncedFetch]);

  const handleFollowCompany = async (e, company) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to follow companies.");
      return;
    }

    const isCurrentlyFollowing = isFollowingMap[company.id] || false;

    try {
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/company-favorite`,
        { company_id: company.id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(response.data.message || "Company followed successfully!");
        setIsFollowingMap((prev) => ({
          ...prev,
          [company.id]: !isCurrentlyFollowing,
        }));
      }
    } catch (error) {
      toast.error("Error following company. Please try again.");
    }
  };

  if (loading) return <FullPageLoader LoadingText="Companies listing..." />;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

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

      {localStorage.getItem(Constant.USER_TOKEN) ? <DashboardCandidatesHeader /> :<DefaulHeader2 />}

      {/* Search Section */}
      <div className="max-w-5xl mx-auto px-4 py-8 mt-20 flex flex-col md:flex-row items-center justify-between ">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center">
            <input
              type="text"
              placeholder="Search by Company Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
            
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <h2 className="text-2xl font-bold mb-1">Trending Companies</h2>
        {/* <p className="text-gray-500 text-lg mb-6">{jobCount} Companies found!</p> */}
      </div>

      {/* Company Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {jobs.map((job) => (
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
