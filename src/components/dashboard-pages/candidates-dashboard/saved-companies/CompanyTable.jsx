import React, { useEffect, useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import { BsBriefcase } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import CompanyCard from "@/components/job-listing-pages/job-list-v7/CompanyCard";

const CompaniesTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);
  const [isFollowingMap, setIsFollowingMap] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    fetchFavoriteCompanies();
  }, [sortOrder]);

  const fetchFavoriteCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/companies-favorite-list?is_favorite_company=1`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        const data = response.data.data;
        setCompanies(data);
        const followState = {};
        data.forEach((company) => {
          followState[company.id] = true;
        });
        setIsFollowingMap(followState);
      } else {
        setError("Failed to fetch favorite companies.");
      }
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("An error occurred while fetching favorite companies.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowCompany = async (e, company) => {
    e.preventDefault();

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const isCurrentlyFollowing = isFollowingMap[company.id];

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

      if (response.data.status === "success") {
        toast.success(
          isCurrentlyFollowing
            ? "Unfollowed company successfully."
            : "Company followed successfully."
        );

        // Toggle state
        setIsFollowingMap((prev) => ({
          ...prev,
          [company.id]: !isCurrentlyFollowing,
        }));

        // If unfollowed, remove from list
        if (isCurrentlyFollowing) {
          setCompanies((prev) =>
            prev.filter((item) => item.id !== company.id)
          );
        }
      } else {
        toast.error("Failed to update follow status.");
      }
    } catch (err) {
      console.error("Follow company error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-3 sm:px-4">
      {/* <Toaster /> */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Favorite Companies
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              className="px-3 sm:px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading companies...</p>
          </div>
        ): companies &&companies.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-gray-500">
            <BsBriefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg sm:text-xl mb-2">No Favorite Companies</p>
            <p className="text-sm sm:text-base">Start following companies you like.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companies?.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                isFollowing={isFollowingMap[company.id]}
                onFollow={(e) => handleFollowCompany(e, company)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesTable;
