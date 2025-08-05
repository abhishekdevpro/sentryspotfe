// src/hooks/useJobActions.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";

const useJobActions = ({ setFilteredJobs }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionStatus, setActionStatus] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const applyToJob = (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setActionStatus((prev) => ({ ...prev, [jobId]: "applying" }));

    navigate(`/apply/${jobId}`);
    setSelectedJobId(jobId);
    setShowPopup(true);

    setActionStatus((prev) => ({ ...prev, [jobId]: "applied" }));

    // Optionally update local job state
    setFilteredJobs?.((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, is_applied: true } : job
      )
    );
  };

  const saveJob = async (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setActionStatus((prev) => ({ ...prev, [jobId]: "saving" }));

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "status" || response.data.code === 200) {
        toast.success(response.message || "Job saved successfully!");
        setActionStatus((prev) => ({ ...prev, [jobId]: "saved" }));

        setFilteredJobs?.((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId ? { ...job, is_favorite: !job.is_favorite } : job
          )
        );
      } else {
        toast.error("Failed to save the job.");
        setActionStatus((prev) => ({ ...prev, [jobId]: "error" }));
      }
    } catch (error) {
      toast.error("Error saving the job.");
      setActionStatus((prev) => ({ ...prev, [jobId]: "error" }));
    }
  };

  const followCompany = async (companyId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setActionStatus((prev) => ({
      ...prev,
      [`company_${companyId}`]: "following",
    }));

    try {
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/company-favorite`,
        {
          company_id: companyId,
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
        setIsFollowing((prev) => !prev);
        setActionStatus((prev) => ({
          ...prev,
          [`company_${companyId}`]: "followed",
        }));

        // Update jobData with new company_favorite_id
        setJobData?.((prevData) => ({
          ...prevData,
          is_company_favorite: !prevData.is_company_favorite,
          company_favorite_id: !prevData.is_company_favorite
            ? response.data.data?.company_favorite_id || 1
            : 0,
        }));
      } else {
        toast.error("Failed to follow company. Please try again.");
        setActionStatus((prev) => ({
          ...prev,
          [`company_${companyId}`]: "error",
        }));
      }
    } catch (error) {
      toast.error(
        "An error occurred while following the company. Please try again."
      );
      setActionStatus((prev) => ({
        ...prev,
        [`company_${companyId}`]: "error",
      }));
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedJobId(null);
  };

  const closeLoginModal = () => setShowLoginModal(false);

  return {
    applyToJob,
    saveJob,
    followCompany,
    selectedJobId,
    showPopup,
    closePopup,
    showLoginModal,
    closeLoginModal,
    actionStatus,
    isFollowing,
    setIsFollowing,
  };
};

export default useJobActions;
