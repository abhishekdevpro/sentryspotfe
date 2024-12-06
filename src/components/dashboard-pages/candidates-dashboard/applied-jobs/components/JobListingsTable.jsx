
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { Eye } from "lucide-react";

const JobListingsTable = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("6");

  useEffect(() => {
    fetchAppliedJobs();
  }, [timeFilter]);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        setAppliedJobs(response.data.data);
        setError(null);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching jobs");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      // year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const DefaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";

  return (
    <div className="bg-gray-100 min-h-screen py-3 px-3">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              My Applied Jobs
            </h2>
            <select
              className="px-4 py-2 border rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="6">Last 6 Months</option>
              <option value="12">Last 12 Months</option>
              <option value="16">Last 16 Months</option>
              <option value="24">Last 24 Months</option>
              <option value="60">Last 5 Years</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-500">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-600 text-lg">{error}</div>
          ) : appliedJobs.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-lg">
              No applied jobs available at the moment. Please apply to jobs and
              check back later.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                      Job Title
                    </th>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                      Posted At
                    </th>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                      Location
                    </th>
                    <th className="px-6 py-4 text-center text-gray-700 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={job.logo || DefaultImage}
                            alt={`${job.job_title} logo`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <Link
                              to={`/job-single-v3/${job.id}`}
                              className="font-medium text-black hover:text-blue-800"
                            >
                              {job.job_title}
                            </Link>
                            {job.specialisms && (
                              <p className="text-sm text-gray-600 mt-1">
                                {job.specialisms}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-gray-600">
                        {formatDate(job.created_at)}
                      </td>
                      <td className="px-6 py-6 text-gray-600">
                        {job.complete_address ||
                          job.city ||
                          "Location not specified"}{" "}
                        {job.country ? "," : ""} {job.country}
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center gap-2">
                          <Link to={`/job-single-v3/${job.id}`}>
                            <button
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                              title="View Application"
                            >
                              <Eye />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
