import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsBriefcase, BsClock, BsGeoAlt, BsBuilding } from "react-icons/bs";
import { FiEye, FiCalendar, FiAward } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";
import JobCard from "@/components/job-listing-pages/job-list-v3/JobCard";
import useJobActions from "@/hooks/useJobActions";

const JobApplied = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { applyToJob, saveJob, actionStatus } = useJobActions({
    setFilteredJobs: setAppliedJobs,
  });

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/applyjobs?is_applied=1&filter_by=date&order_by=desc`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        setAppliedJobs(response.data.data.slice(0, 6));
        setError(null);
      } else {
        setError("Failed to fetch applied jobs");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching applied jobs");
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading applied jobs...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-600 text-sm">{error}</div>;
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <BsBriefcase className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm">No Applied Jobs</p>
        <p className="text-xs">
          Explore and apply to jobs you're interested in.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {appliedJobs?.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onSaveJob={() => saveJob(job.id)}
          onApplyJob={() => applyToJob(job.id)}
          actionStatus={actionStatus}
          showApplyButton={true}
          showSaveButton={true}
        />
      ))}
    </div>
  );
};

export default JobApplied;
